import random

def generate_lat_lon(base_lat, base_lon, range_lat, range_lon):
    lat = base_lat + (random.random() * range_lat)
    lon = base_lon + (random.random() * range_lon)
    return round(lat, 6), round(lon, 6)

# 지역별 좌표 범위
AREAS = {
    'seoul': {  # 서울 지역
        'gangnam': (37.495, 127.020, 0.035, 0.040),  # 강남
        'hongdae': (37.550, 126.910, 0.020, 0.020),  # 홍대
        'itaewon': (37.530, 126.990, 0.010, 0.020),  # 이태원
    },
    'incheon': {  # 인천 지역
        'songdo': (37.380, 126.610, 0.030, 0.040),   # 송도
        'bupyeong': (37.480, 126.710, 0.030, 0.030), # 부평
        'guwol': (37.440, 126.700, 0.020, 0.020),    # 구월동
    },
    'seongnam': {  # 성남 지역
        'bundang': (37.320, 127.100, 0.060, 0.050),  # 분당
        'pangyo': (37.390, 127.080, 0.020, 0.030),   # 판교
    }
}

# 식당 이름 구성 요소
PREFIXES = ['프로틴', '헬시', '머슬', '파워', '단백질', '피트니스']
TYPES = ['키친', '마켓', '스토어', '플레이트', '하우스', '팩토리', '다이너', '바']

# SQL 생성
sql = []
restaurants_per_city = 50  # 각 도시당 50개의 식당
start_id = 100  # R000100부터 시작

for city, areas in AREAS.items():
    num_areas = len(areas)
    base_per_area = restaurants_per_city // num_areas  # 각 구역당 기본 식당 수
    remainder = restaurants_per_city % num_areas  # 남은 식당 수
    
    for area_name, (base_lat, base_lon, range_lat, range_lon) in areas.items():
        # 이 구역에 할당할 식당 수 계산
        if remainder > 0:
            area_restaurants = base_per_area + 1
            remainder -= 1
        else:
            area_restaurants = base_per_area
            
        for _ in range(area_restaurants):
            lat, lon = generate_lat_lon(base_lat, base_lon, range_lat, range_lon)
            name = f"{random.choice(PREFIXES)} {random.choice(TYPES)} {area_name}"
            
            sql.append(
                f"('R{str(start_id).zfill(6)}', '{name}', {lat}, {lon}, "
                f"{random.randint(1, 3)}, false, false)"
            )
            start_id += 1

# SQL 파일에 추가
with open('additional_test_data.sql', 'w', encoding='utf-8') as f:
    f.write("-- 추가 테스트 데이터\n")
    f.write(f"-- R000100부터 시작하여 각 도시별로 50개씩 추가 (총 {len(sql)}개)\n")
    f.write("INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data) VALUES\n")
    f.write(',\n'.join(sql) + ';\n\n')
    
    # 메뉴 데이터 추가
    f.write("-- 각 식당의 메뉴 데이터 추가\n")
    f.write("""INSERT INTO menus (menu_id, restaurant_id, menu_name, price, calories, protein, sodium, saturated_fat, carbohydrates, image_url)
SELECT 
  'M' || substr(r.restaurant_id, 2) || '_1',
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
WHERE r.restaurant_id >= 'R000100';\n\n""")

    # 영양정보 요청 데이터 추가
    f.write("-- 영양정보 요청 데이터 추가\n")
    f.write("""INSERT INTO nutrition_requests (restaurant_id, request_status, interest_count)
SELECT 
  restaurant_id,
  CASE (ABS(RANDOM()) % 3)
    WHEN 0 THEN '의뢰신청중'
    WHEN 1 THEN '분석완료'
    ELSE '미신청'
  END,
  ABS(RANDOM()) % 10
FROM restaurants
WHERE restaurant_id >= 'R000100';""") 