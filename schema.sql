-- 기존 테이블 삭제
DROP TABLE IF EXISTS nutrition_requests;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS restaurant_categories;

-- 음식점 카테고리 테이블 (유연한 카테고리 관리)
CREATE TABLE restaurant_categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE
);

-- 음식점 기본 정보
CREATE TABLE restaurants (
    restaurant_id TEXT PRIMARY KEY CHECK (restaurant_id LIKE 'restaurant_%'),
    display_name TEXT NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    category_id INTEGER NOT NULL,
    has_accurate_nutrition BOOLEAN NOT NULL DEFAULT 0,
    has_nutrition_data BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES restaurant_categories(category_id)
);

-- 메뉴 정보 (영양데이터가 있는 음식점만)
CREATE TABLE menus (
    menu_id TEXT PRIMARY KEY CHECK (menu_id LIKE 'menu_%'),
    restaurant_id TEXT NOT NULL,
    menu_name TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 0),
    calories INTEGER NOT NULL CHECK (calories >= 0),  -- kcal
    protein REAL NOT NULL CHECK (protein >= 0),      -- g
    sodium INTEGER NOT NULL CHECK (sodium >= 0),      -- mg
    saturated_fat REAL NOT NULL CHECK (saturated_fat >= 0), -- g
    carbohydrates REAL NOT NULL CHECK (carbohydrates >= 0), -- g
    image_url TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    UNIQUE (restaurant_id, menu_name)
);

-- 영양데이터가 없는 음식점 추가 정보
CREATE TABLE nutrition_requests (
    restaurant_id TEXT PRIMARY KEY,
    request_status TEXT NOT NULL CHECK (request_status IN ('의뢰신청중', '분석완료', '미신청')),
    interest_count INTEGER NOT NULL DEFAULT 0 CHECK (interest_count >= 0),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- 데이터 정합성을 위한 트리거들
CREATE TRIGGER check_nutrition_data_insert
AFTER INSERT ON restaurants
FOR EACH ROW
WHEN NEW.has_nutrition_data = 1
BEGIN
    SELECT RAISE(ROLLBACK, 'Restaurant with has_nutrition_data=1 must have at least one menu')
    WHERE NOT EXISTS (SELECT 1 FROM menus WHERE restaurant_id = NEW.restaurant_id);
END;

CREATE TRIGGER check_nutrition_data_update
AFTER UPDATE ON restaurants
FOR EACH ROW
WHEN NEW.has_nutrition_data = 1
BEGIN
    SELECT RAISE(ROLLBACK, 'Restaurant with has_nutrition_data=1 must have at least one menu')
    WHERE NOT EXISTS (SELECT 1 FROM menus WHERE restaurant_id = NEW.restaurant_id);
END;

CREATE TRIGGER check_menu_count
BEFORE INSERT ON menus
BEGIN
    SELECT RAISE(ROLLBACK, 'Restaurant cannot have more than 3 menus')
    WHERE (
        SELECT COUNT(*) 
        FROM menus 
        WHERE restaurant_id = NEW.restaurant_id
    ) >= 3;
END;

CREATE TRIGGER check_nutrition_request_insert
BEFORE INSERT ON nutrition_requests
BEGIN
    SELECT RAISE(ROLLBACK, 'Only restaurants with has_nutrition_data=0 can have nutrition requests')
    WHERE EXISTS (
        SELECT 1 
        FROM restaurants 
        WHERE restaurant_id = NEW.restaurant_id 
        AND has_nutrition_data = 1
    );
END;



-- 테스트데이터
-- 1. 카테고리 데이터
INSERT INTO restaurant_categories (category_name) VALUES 
    ('한식'),
    ('중식'),
    ('일식'),
    ('양식');

-- 2. 영양정보 없는 음식점 (서울시 내 좌표)
INSERT INTO restaurants (
    restaurant_id, display_name, latitude, longitude, 
    category_id, has_accurate_nutrition, has_nutrition_data
) VALUES 
    ('restaurant_001000', '맛있는 중국집', 37.534892, 126.994098, 2, 0, 0),    -- 서울역 근처
    ('restaurant_001001', '스시 오마카세', 37.524987, 127.025537, 3, 0, 0),     -- 강남역 근처
    ('restaurant_001002', '전통 한식당', 37.572813, 126.976701, 1, 0, 0),       -- 광화문 근처
    ('restaurant_001003', '이탈리안 레스토랑', 37.506207, 127.053648, 4, 0, 0); -- 삼성동 근처

-- 3. 영양정보 있는 음식점 (서울시 내 좌표)
INSERT INTO restaurants (
    restaurant_id, display_name, latitude, longitude, 
    category_id, has_accurate_nutrition, has_nutrition_data
) VALUES 
    ('restaurant_001004', '건강한 닭가슴살', 37.497942, 127.027778, 1, 1, 0),   -- 강남구
    ('restaurant_001005', '프로틴 스테이크', 37.555645, 126.936883, 4, 1, 0),   -- 홍대입구
    ('restaurant_001006', '일품 닭요리', 37.563320, 127.036556, 1, 1, 0);       -- 성수동

-- 4. 메뉴 데이터 삽입 (각 음식점당 최대 3개)
INSERT INTO menus (
    menu_id, restaurant_id, menu_name, price,
    calories, protein, sodium, saturated_fat, carbohydrates,
    image_url
) VALUES 
    -- 건강한 닭가슴살 (restaurant_001004)
    ('menu_001004', 'restaurant_001004', '닭가슴살 스테이크', 12000, 300, 35, 500, 2.5, 10, 'https://example.com/images/menu_001004.jpg'),
    ('menu_001005', 'restaurant_001004', '닭가슴살 샐러드', 10000, 250, 30, 400, 1.5, 15, 'https://example.com/images/menu_001005.jpg'),
    ('menu_001006', 'restaurant_001004', '닭가슴살 수비드', 13000, 280, 38, 450, 2.0, 8, 'https://example.com/images/menu_001006.jpg'),

    -- 프로틴 스테이크 (restaurant_001005)
    ('menu_001007', 'restaurant_001005', '립아이 스테이크', 35000, 600, 45, 800, 8.0, 5, 'https://example.com/images/menu_001007.jpg'),
    ('menu_001008', 'restaurant_001005', '안심 스테이크', 38000, 550, 48, 750, 7.5, 4, 'https://example.com/images/menu_001008.jpg'),
    ('menu_001009', 'restaurant_001005', '채끝 스테이크', 33000, 580, 43, 780, 7.8, 6, 'https://example.com/images/menu_001009.jpg'),

    -- 일품 닭요리 (restaurant_001006)
    ('menu_001010', 'restaurant_001006', '닭가슴살 볶음밥', 9000, 400, 25, 600, 3.0, 45, 'https://example.com/images/menu_001010.jpg'),
    ('menu_001011', 'restaurant_001006', '닭가슴살 리조또', 11000, 420, 28, 550, 3.5, 48, 'https://example.com/images/menu_001011.jpg'),
    ('menu_001012', 'restaurant_001006', '닭가슴살 브리또', 10000, 380, 32, 520, 3.2, 35, 'https://example.com/images/menu_001012.jpg');

-- 5. has_nutrition_data 업데이트
UPDATE restaurants 
SET has_nutrition_data = 1 
WHERE restaurant_id IN ('restaurant_001004', 'restaurant_001005', 'restaurant_001006');

-- 6. 영양정보 요청 데이터
INSERT INTO nutrition_requests (
    restaurant_id, request_status, interest_count
) VALUES 
    ('restaurant_001000', '의뢰신청중', 15),
    ('restaurant_001001', '미신청', 8),
    ('restaurant_001002', '분석완료', 12),
    ('restaurant_001003', '의뢰신청중', 20);

-- 서울 테스트 데이터 (강남, 홍대, 이태원 등 주요 상권 중심)
INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data)
VALUES 
  -- 강남 지역 (37.495~37.530, 127.020~127.060)
  ('restaurant_001007', '강남 치킨 프로틴', 37.502123, 127.024567, 1, false, false),
  ('restaurant_001008', '헬시 키친 강남점', 37.505678, 127.028901, 2, false, false),
  ('restaurant_001009', '프로틴 플레이트', 37.508912, 127.032345, 3, false, false),
  ('restaurant_001010', '머슬팩토리 강남', 37.512345, 127.036789, 1, false, false),
  ('restaurant_001011', '파워플레이트 신사', 37.515678, 127.040123, 2, false, false),
  -- 홍대 지역 (37.550~37.570, 126.910~126.930)
  ('restaurant_001012', '홍대 프로틴 바', 37.552345, 126.912345, 3, false, false),
  ('restaurant_001013', '헬시 브런치 홍대', 37.555678, 126.915678, 1, false, false),
  ('restaurant_001014', '머슬메이커 홍대점', 37.558912, 126.918912, 2, false, false),
  ('restaurant_001015', '프로틴 팩토리 상수', 37.562345, 126.922345, 3, false, false),
  ('restaurant_001016', '피트니스 키친 홍대', 37.565678, 126.925678, 1, false, false),
  -- 이태원 지역 (37.530~37.540, 126.990~127.010)
  ('restaurant_001017', '이태원 프로틴 바', 37.532345, 126.992345, 2, false, false),
  ('restaurant_001018', '헬시 플레이트 이태원', 37.533456, 126.993456, 3, false, false),
  -- 강남 추가
  ('restaurant_001019', '단백질 마켓 강남', 37.503456, 127.025678, 1, false, false),
  ('restaurant_001020', '프로틴 플러스 강남', 37.506789, 127.029012, 2, false, false);

-- 인천 테스트 데이터 (송도, 부평, 구월동 등)
INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data)
VALUES 
  -- 송도 지역 (37.380~37.410, 126.610~126.650)
  ('restaurant_001021', '송도 프로틴 하우스', 37.382345, 126.612345, 1, false, false),
  ('restaurant_001022', '헬시 플레이스 송도점', 37.385678, 126.615678, 2, false, false),
  ('restaurant_001023', '머슬 키친 인천점', 37.388912, 126.618912, 3, false, false),
  ('restaurant_001024', '프로틴 마켓 송도', 37.392345, 126.622345, 1, false, false),
  ('restaurant_001025', '헬시 밀스 센트럴파크', 37.395678, 126.625678, 2, false, false),
  -- 부평 지역 (37.480~37.510, 126.710~126.740)
  ('restaurant_001026', '부평 프로틴 스토어', 37.482345, 126.712345, 3, false, false),
  ('restaurant_001027', '머슬 다이닝 부평', 37.485678, 126.715678, 1, false, false),
  ('restaurant_001028', '파워 키친 부평점', 37.488912, 126.718912, 2, false, false),
  ('restaurant_001029', '헬시 플레이트 부평', 37.492345, 126.722345, 3, false, false),
  ('restaurant_001030', '프로틴 팩토리 부평', 37.495678, 126.725678, 1, false, false),
  -- 구월동 지역 (37.440~37.460, 126.700~126.720)
  ('restaurant_001031', '구월동 프로틴 하우스', 37.442345, 126.702345, 2, false, false),
  ('restaurant_001032', '헬시 플레이트 구월', 37.443456, 126.703456, 3, false, false),
  -- 송도 추가
  ('restaurant_001033', '프로틴 플러스 송도', 37.383456, 126.613456, 1, false, false),
  ('restaurant_001034', '머슬 키친 센트럴파크', 37.386789, 126.616789, 2, false, false);

-- 성남 테스트 데이터 (분당, 서현, 정자동 등)
INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data)
VALUES 
  -- 분당 지역 (37.320~37.380, 127.100~127.150)
  ('restaurant_001035', '분당 프로틴 마켓', 37.322345, 127.102345, 1, false, false),
  ('restaurant_001036', '헬시 밀스 분당점', 37.325678, 127.105678, 2, false, false),
  ('restaurant_001037', '파워 키친 서현점', 37.328912, 127.108912, 3, false, false),
  ('restaurant_001038', '프로틴 하우스 정자', 37.332345, 127.112345, 1, false, false),
  ('restaurant_001039', '머슬 다이너 판교', 37.335678, 127.115678, 2, false, false),
  -- 서현/정자 지역 (37.370~37.390, 127.120~127.150)
  ('restaurant_001040', '서현 프로틴 스토어', 37.372345, 127.122345, 3, false, false),
  ('restaurant_001041', '헬시 플레이트 정자', 37.375678, 127.125678, 1, false, false),
  ('restaurant_001042', '파워 밀스 서현점', 37.378912, 127.128912, 2, false, false),
  ('restaurant_001043', '프로틴 팩토리 정자', 37.382345, 127.132345, 3, false, false),
  ('restaurant_001044', '머슬 키친 판교', 37.385678, 127.135678, 1, false, false),
  -- 판교 지역 (37.390~37.410, 127.080~127.110)
  ('restaurant_001045', '판교 프로틴 스토어', 37.392345, 127.082345, 2, false, false),
  ('restaurant_001046', '헬시 플레이트 판교', 37.393456, 127.083456, 3, false, false),
  -- 분당 추가
  ('restaurant_001047', '프로틴 플러스 서현', 37.323456, 127.103456, 1, false, false),
  ('restaurant_001048', '머슬 키친 정자', 37.326789, 127.106789, 2, false, false);

-- 각 레스토랑에 대한 메뉴 데이터 추가
INSERT INTO menus (menu_id, restaurant_id, menu_name, price, calories, protein, sodium, saturated_fat, carbohydrates, image_url)
SELECT 
  'menu_' || substr(r.restaurant_id, 11),
  r.restaurant_id,
  '프로틴 ' || 
  CASE (ABS(RANDOM()) % 10)
    WHEN 0 THEN '치킨'
    WHEN 1 THEN '샐러드'
    WHEN 2 THEN '스테이크'
    WHEN 3 THEN '연어'
    WHEN 4 THEN '도시락'
    WHEN 5 THEN '볼'
    WHEN 6 THEN '브리또'
    WHEN 7 THEN '샌드위치'
    WHEN 8 THEN '덮밥'
    ELSE '파스타'
  END,
  (ABS(RANDOM()) % 20000 + 10000),
  (ABS(RANDOM()) % 500 + 300),
  (ABS(RANDOM()) % 40 + 20),
  (ABS(RANDOM()) % 1000 + 500),
  (ABS(RANDOM()) % 10 + 5),
  (ABS(RANDOM()) % 50 + 20),
  'https://example.com/images/default-menu.jpg'
FROM restaurants r
WHERE r.restaurant_id >= 'restaurant_001007';

-- nutrition_requests 테이블에 테스트 데이터 추가
INSERT INTO nutrition_requests (restaurant_id, request_status, interest_count)
SELECT 
  restaurant_id,
  CASE (ABS(RANDOM()) % 3)
    WHEN 0 THEN '의뢰신청중'
    WHEN 1 THEN '분석완료'
    ELSE '미신청'
  END,
  ABS(RANDOM()) % 10
FROM restaurants
WHERE restaurant_id >= 'restaurant_001007';

-- 추가 테스트 데이터
INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data) VALUES
('restaurant_001049', '프로틴 키친 강남', 37.512345, 127.034567, 1, false, false),
('restaurant_001050', '헬시 마켓 홍대', 37.558912, 126.918912, 2, false, false),
('restaurant_001051', '머슬 스토어 이태원', 37.532345, 126.992345, 3, false, false);

-- 추가 메뉴 데이터
INSERT INTO menus (menu_id, restaurant_id, menu_name, price, calories, protein, sodium, saturated_fat, carbohydrates, image_url)
SELECT 
  'menu_' || substr(r.restaurant_id, 11),
  r.restaurant_id,
  '프로틴 ' || 
  CASE (ABS(RANDOM()) % 10)
    WHEN 0 THEN '치킨'
    WHEN 1 THEN '샐러드'
    WHEN 2 THEN '스테이크'
    WHEN 3 THEN '연어'
    WHEN 4 THEN '도시락'
    WHEN 5 THEN '볼'
    WHEN 6 THEN '브리또'
    WHEN 7 THEN '샌드위치'
    WHEN 8 THEN '덮밥'
    ELSE '파스타'
  END,
  (ABS(RANDOM()) % 20000 + 10000),
  (ABS(RANDOM()) % 500 + 300),
  (ABS(RANDOM()) % 40 + 20),
  (ABS(RANDOM()) % 1000 + 500),
  (ABS(RANDOM()) % 10 + 5),
  (ABS(RANDOM()) % 50 + 20),
  'https://example.com/images/default-menu.jpg'
FROM restaurants r
WHERE r.restaurant_id >= 'restaurant_001049';

-- 추가 영양정보 요청 데이터
INSERT INTO nutrition_requests (restaurant_id, request_status, interest_count)
SELECT 
  restaurant_id,
  CASE (ABS(RANDOM()) % 3)
    WHEN 0 THEN '의뢰신청중'
    WHEN 1 THEN '분석완료'
    ELSE '미신청'
  END,
  ABS(RANDOM()) % 10
FROM restaurants
WHERE restaurant_id >= 'restaurant_001049';