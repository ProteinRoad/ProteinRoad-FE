-- 추가 테스트 데이터
-- restaurant_000100부터 시작하여 각 도시별로 50개씩 추가 (총 150개)
INSERT INTO restaurants (restaurant_id, display_name, latitude, longitude, category_id, has_accurate_nutrition, has_nutrition_data) VALUES
('restaurant_000100', '프로틴 하우스 gangnam', 37.524481, 127.042359, 1, false, false),
('restaurant_000101', '프로틴 키친 gangnam', 37.528869, 127.027002, 1, false, false),
('restaurant_000102', '프로틴 바 gangnam', 37.503763, 127.058067, 2, false, false),
('restaurant_000103', '헬시 플레이트 gangnam', 37.510981, 127.049877, 2, false, false),
('restaurant_000104', '피트니스 플레이트 gangnam', 37.52356, 127.055195, 1, false, false),
('restaurant_000105', '프로틴 다이너 gangnam', 37.511319, 127.056525, 2, false, false),
('restaurant_000106', '피트니스 바 gangnam', 37.522973, 127.026654, 3, false, false),
('restaurant_000107', '머슬 다이너 gangnam', 37.519054, 127.044374, 1, false, false),
('restaurant_000108', '피트니스 마켓 gangnam', 37.529056, 127.054801, 1, false, false),
('restaurant_000109', '피트니스 키친 gangnam', 37.509682, 127.034095, 3, false, false),
('restaurant_000110', '프로틴 마켓 gangnam', 37.525442, 127.054244, 2, false, false),
('restaurant_000111', '피트니스 키친 gangnam', 37.507586, 127.028419, 2, false, false),
('restaurant_000112', '단백질 다이너 gangnam', 37.503142, 127.043267, 2, false, false),
('restaurant_000113', '단백질 팩토리 gangnam', 37.524515, 127.042924, 3, false, false),
('restaurant_000114', '단백질 하우스 gangnam', 37.529696, 127.024907, 3, false, false),
('restaurant_000115', '단백질 플레이트 gangnam', 37.523563, 127.041194, 2, false, false),
('restaurant_000116', '단백질 마켓 gangnam', 37.509997, 127.03744, 2, false, false),
('restaurant_000117', '파워 하우스 hongdae', 37.563, 126.917131, 1, false, false),
('restaurant_000118', '헬시 스토어 hongdae', 37.55581, 126.927763, 1, false, false),
('restaurant_000119', '머슬 마켓 hongdae', 37.554795, 126.921461, 2, false, false),
('restaurant_000120', '헬시 마켓 hongdae', 37.551883, 126.911836, 2, false, false),
('restaurant_000121', '프로틴 스토어 hongdae', 37.557404, 126.92046, 1, false, false),
('restaurant_000122', '파워 마켓 hongdae', 37.553976, 126.917803, 1, false, false),
('restaurant_000123', '파워 키친 hongdae', 37.553122, 126.927378, 1, false, false),
('restaurant_000124', '단백질 스토어 hongdae', 37.559897, 126.917394, 3, false, false),
('restaurant_000125', '단백질 플레이트 hongdae', 37.551731, 126.917121, 2, false, false),
('restaurant_000126', '파워 플레이트 hongdae', 37.565816, 126.923281, 1, false, false),
('restaurant_000127', '머슬 하우스 hongdae', 37.561577, 126.918025, 2, false, false),
('restaurant_000128', '파워 마켓 hongdae', 37.564895, 126.920015, 2, false, false),
('restaurant_000129', '머슬 바 hongdae', 37.552047, 126.914349, 2, false, false),
('restaurant_000130', '머슬 다이너 hongdae', 37.569228, 126.914335, 2, false, false),
('restaurant_000131', '프로틴 바 hongdae', 37.563361, 126.919018, 2, false, false),
('restaurant_000132', '프로틴 스토어 hongdae', 37.550811, 126.926627, 2, false, false),
('restaurant_000133', '파워 팩토리 hongdae', 37.553861, 126.914785, 1, false, false),
('restaurant_000134', '피트니스 스토어 itaewon', 37.537475, 127.001907, 3, false, false),
('restaurant_000135', '헬시 팩토리 itaewon', 37.539858, 127.008805, 2, false, false),
('restaurant_000136', '단백질 플레이트 itaewon', 37.536658, 127.003433, 1, false, false),
('restaurant_000137', '피트니스 플레이트 itaewon', 37.538082, 126.99671, 3, false, false),
('restaurant_000138', '헬시 플레이트 itaewon', 37.532397, 126.991674, 1, false, false),
('restaurant_000139', '피트니스 키친 itaewon', 37.538403, 127.007505, 2, false, false),
('restaurant_000140', '프로틴 바 itaewon', 37.535282, 126.997307, 2, false, false),
('restaurant_000141', '헬시 스토어 itaewon', 37.532636, 126.990347, 2, false, false),
('restaurant_000142', '단백질 키친 itaewon', 37.533546, 127.009623, 3, false, false),
('restaurant_000143', '단백질 팩토리 itaewon', 37.535265, 126.993801, 3, false, false),
('restaurant_000144', '파워 하우스 itaewon', 37.533455, 127.000757, 3, false, false),
('restaurant_000145', '머슬 플레이트 itaewon', 37.539033, 126.993729, 3, false, false),
('restaurant_000146', '헬시 플레이트 itaewon', 37.531148, 126.990274, 2, false, false),
('restaurant_000147', '프로틴 스토어 itaewon', 37.533661, 127.001251, 2, false, false),
('restaurant_000148', '피트니스 키친 itaewon', 37.53198, 126.999437, 2, false, false),
('restaurant_000149', '단백질 바 itaewon', 37.539067, 127.007273, 3, false, false),
('restaurant_000150', '머슬 스토어 songdo', 37.381865, 126.639613, 3, false, false),
('restaurant_000151', '파워 키친 songdo', 37.384322, 126.645671, 3, false, false),
('restaurant_000152', '피트니스 다이너 songdo', 37.400808, 126.618223, 3, false, false),
('restaurant_000153', '헬시 스토어 songdo', 37.409743, 126.614691, 2, false, false),
('restaurant_000154', '프로틴 플레이트 songdo', 37.408147, 126.637282, 1, false, false),
('restaurant_000155', '피트니스 다이너 songdo', 37.382754, 126.621747, 1, false, false),
('restaurant_000156', '헬시 팩토리 songdo', 37.399622, 126.643422, 1, false, false),
('restaurant_000157', '단백질 스토어 songdo', 37.39975, 126.638791, 1, false, false),
('restaurant_000158', '머슬 하우스 songdo', 37.388058, 126.628017, 1, false, false),
('restaurant_000159', '머슬 키친 songdo', 37.40956, 126.618944, 1, false, false),
('restaurant_000160', '파워 바 songdo', 37.399621, 126.620286, 3, false, false),
('restaurant_000161', '피트니스 키친 songdo', 37.397455, 126.610923, 1, false, false),
('restaurant_000162', '프로틴 팩토리 songdo', 37.40694, 126.634469, 1, false, false),
('restaurant_000163', '헬시 하우스 songdo', 37.4011, 126.632729, 2, false, false),
('restaurant_000164', '파워 하우스 songdo', 37.401556, 126.619767, 2, false, false),
('restaurant_000165', '프로틴 바 songdo', 37.39823, 126.634823, 3, false, false),
('restaurant_000166', '파워 스토어 songdo', 37.402877, 126.625036, 2, false, false),
('restaurant_000167', '피트니스 팩토리 bupyeong', 37.50425, 126.725244, 3, false, false),
('restaurant_000168', '단백질 키친 bupyeong', 37.491634, 126.734423, 3, false, false),
('restaurant_000169', '프로틴 팩토리 bupyeong', 37.489683, 126.720138, 1, false, false),
('restaurant_000170', '파워 키친 bupyeong', 37.49693, 126.713658, 1, false, false),
('restaurant_000171', '머슬 다이너 bupyeong', 37.490805, 126.728155, 1, false, false),
('restaurant_000172', '머슬 스토어 bupyeong', 37.491236, 126.729241, 3, false, false),
('restaurant_000173', '프로틴 하우스 bupyeong', 37.501067, 126.737639, 1, false, false),
('restaurant_000174', '단백질 바 bupyeong', 37.505825, 126.720223, 3, false, false),
('restaurant_000175', '프로틴 바 bupyeong', 37.489296, 126.732742, 2, false, false),
('restaurant_000176', '프로틴 팩토리 bupyeong', 37.484721, 126.733367, 1, false, false),
('restaurant_000177', '단백질 스토어 bupyeong', 37.491843, 126.714488, 2, false, false),
('restaurant_000178', '단백질 팩토리 bupyeong', 37.498186, 126.721448, 2, false, false),
('restaurant_000179', '헬시 플레이트 bupyeong', 37.484585, 126.719285, 1, false, false),
('restaurant_000180', '피트니스 팩토리 bupyeong', 37.485341, 126.718691, 1, false, false),
('restaurant_000181', '머슬 팩토리 bupyeong', 37.489384, 126.710332, 1, false, false),
('restaurant_000182', '헬시 스토어 bupyeong', 37.499951, 126.715044, 2, false, false),
('restaurant_000183', '파워 스토어 bupyeong', 37.499002, 126.73533, 1, false, false),
('restaurant_000184', '헬시 하우스 guwol', 37.459325, 126.707816, 1, false, false),
('restaurant_000185', '머슬 플레이트 guwol', 37.44931, 126.70284, 1, false, false),
('restaurant_000186', '파워 바 guwol', 37.444184, 126.711663, 3, false, false),
('restaurant_000187', '단백질 다이너 guwol', 37.446935, 126.702459, 3, false, false),
('restaurant_000188', '프로틴 다이너 guwol', 37.451032, 126.708334, 1, false, false),
('restaurant_000189', '단백질 하우스 guwol', 37.440209, 126.714318, 3, false, false),
('restaurant_000190', '프로틴 플레이트 guwol', 37.447921, 126.701251, 1, false, false),
('restaurant_000191', '헬시 하우스 guwol', 37.440322, 126.707187, 1, false, false),
('restaurant_000192', '피트니스 플레이트 guwol', 37.451531, 126.704464, 2, false, false),
('restaurant_000193', '단백질 스토어 guwol', 37.447416, 126.704895, 2, false, false),
('restaurant_000194', '피트니스 마켓 guwol', 37.453482, 126.71262, 2, false, false),
('restaurant_000195', '헬시 팩토리 guwol', 37.447578, 126.701974, 1, false, false),
('restaurant_000196', '프로틴 스토어 guwol', 37.450499, 126.703339, 2, false, false),
('restaurant_000197', '머슬 다이너 guwol', 37.456223, 126.717266, 3, false, false),
('restaurant_000198', '헬시 플레이트 guwol', 37.450815, 126.715368, 2, false, false),
('restaurant_000199', '프로틴 마켓 guwol', 37.440188, 126.709142, 2, false, false),
('restaurant_000200', '프로틴 스토어 bundang', 37.358556, 127.100748, 3, false, false),
('restaurant_000201', '파워 키친 bundang', 37.335105, 127.110109, 1, false, false),
('restaurant_000202', '단백질 스토어 bundang', 37.338198, 127.107318, 2, false, false),
('restaurant_000203', '파워 플레이트 bundang', 37.354145, 127.146112, 1, false, false),
('restaurant_000204', '머슬 키친 bundang', 37.322334, 127.114733, 3, false, false),
('restaurant_000205', '피트니스 바 bundang', 37.325301, 127.113441, 1, false, false),
('restaurant_000206', '파워 마켓 bundang', 37.372623, 127.114881, 3, false, false),
('restaurant_000207', '프로틴 하우스 bundang', 37.362197, 127.146074, 3, false, false),
('restaurant_000208', '피트니스 스토어 bundang', 37.332444, 127.136348, 1, false, false),
('restaurant_000209', '파워 바 bundang', 37.326516, 127.115702, 3, false, false),
('restaurant_000210', '프로틴 마켓 bundang', 37.375546, 127.143023, 1, false, false),
('restaurant_000211', '파워 팩토리 bundang', 37.349792, 127.122032, 3, false, false),
('restaurant_000212', '프로틴 마켓 bundang', 37.378979, 127.113642, 1, false, false),
('restaurant_000213', '프로틴 플레이트 bundang', 37.330661, 127.10954, 1, false, false),
('restaurant_000214', '단백질 마켓 bundang', 37.365334, 127.1493, 3, false, false),
('restaurant_000215', '피트니스 키친 bundang', 37.346209, 127.134788, 3, false, false),
('restaurant_000216', '파워 다이너 bundang', 37.375932, 127.121655, 2, false, false),
('restaurant_000217', '머슬 스토어 bundang', 37.378838, 127.119261, 3, false, false),
('restaurant_000218', '헬시 팩토리 bundang', 37.336716, 127.106217, 3, false, false),
('restaurant_000219', '단백질 플레이트 bundang', 37.379737, 127.134837, 1, false, false),
('restaurant_000220', '단백질 바 bundang', 37.340931, 127.140672, 2, false, false),
('restaurant_000221', '프로틴 하우스 bundang', 37.32524, 127.130953, 1, false, false),
('restaurant_000222', '프로틴 키친 bundang', 37.351303, 127.114887, 1, false, false),
('restaurant_000223', '머슬 스토어 bundang', 37.36007, 127.101616, 3, false, false),
('restaurant_000224', '단백질 하우스 bundang', 37.357623, 127.106442, 1, false, false),
('restaurant_000225', '머슬 다이너 pangyo', 37.401795, 127.099154, 2, false, false),
('restaurant_000226', '헬시 팩토리 pangyo', 37.390499, 127.100913, 2, false, false),
('restaurant_000227', '머슬 스토어 pangyo', 37.40157, 127.094377, 2, false, false),
('restaurant_000228', '머슬 스토어 pangyo', 37.394089, 127.087615, 1, false, false),
('restaurant_000229', '머슬 스토어 pangyo', 37.401027, 127.086704, 3, false, false),
('restaurant_000230', '프로틴 다이너 pangyo', 37.408805, 127.083014, 1, false, false),
('restaurant_000231', '단백질 다이너 pangyo', 37.398458, 127.089135, 1, false, false),
('restaurant_000232', '머슬 팩토리 pangyo', 37.393521, 127.081513, 3, false, false),
('restaurant_000233', '파워 다이너 pangyo', 37.40971, 127.091759, 3, false, false),
('restaurant_000234', '단백질 하우스 pangyo', 37.391543, 127.094053, 1, false, false),
('restaurant_000235', '단백질 스토어 pangyo', 37.408171, 127.104614, 3, false, false),
('restaurant_000236', '헬시 마켓 pangyo', 37.39431, 127.096455, 2, false, false),
('restaurant_000237', '단백질 팩토리 pangyo', 37.407297, 127.091399, 3, false, false),
('restaurant_000238', '파워 다이너 pangyo', 37.395586, 127.089603, 2, false, false),
('restaurant_000239', '머슬 다이너 pangyo', 37.39412, 127.091848, 3, false, false),
('restaurant_000240', '머슬 스토어 pangyo', 37.397462, 127.101514, 3, false, false),
('restaurant_000241', '피트니스 스토어 pangyo', 37.404257, 127.089745, 1, false, false),
('restaurant_000242', '머슬 팩토리 pangyo', 37.409082, 127.090004, 2, false, false),
('restaurant_000243', '단백질 하우스 pangyo', 37.403965, 127.101113, 1, false, false),
('restaurant_000244', '헬시 마켓 pangyo', 37.400466, 127.086517, 1, false, false),
('restaurant_000245', '헬시 하우스 pangyo', 37.407335, 127.105114, 1, false, false),
('restaurant_000246', '프로틴 팩토리 pangyo', 37.403667, 127.103406, 1, false, false),
('restaurant_000247', '단백질 팩토리 pangyo', 37.391233, 127.084268, 2, false, false),
('restaurant_000248', '파워 다이너 pangyo', 37.394536, 127.081905, 3, false, false),
('restaurant_000249', '프로틴 플레이트 pangyo', 37.397718, 127.100523, 2, false, false);

-- 각 식당의 메뉴 데이터 추가
INSERT INTO menus (menu_id, restaurant_id, menu_name, price, calories, protein, sodium, saturated_fat, carbohydrates, image_url)
SELECT 
  'menu_' || r.restaurant_id || '_1',
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
WHERE r.restaurant_id >= 'restaurant_000100';

-- 영양정보 요청 데이터 추가
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
WHERE restaurant_id >= 'restaurant_000100';