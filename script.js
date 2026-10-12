/* ============================================================
   Lucky Rental Car — page logic: EN/RU, fleet cards, FAQ, menu, lightbox.
   Layout/responsiveness lives in styles.css (CSS variables per breakpoint).
   Data + card templates below are generated from the v2 design.
   ============================================================ */
const WA = "https://wa.me/995555562877", TG = "https://t.me/+995555562877";
const REVIEWS = {"rating":"5.0","count":72};
const TIERS = [["1–2 days","1–2 дня"],["3–5 days","3–5 дней"],["6–10 days","6–10 дней"]];
const CARS = [
  {"name":"Hyundai Sonata","slug":"sonata","n":6,"prices":[60,50,45],"cls":["Comfort Sedan","Комфорт-седан"],"tag":["Smooth, quiet 180 HP cruiser for the coast","Тихий и плавный седан 180 л.с."],"specs":[["Automatic","180 HP","5 seats","Petrol"],["Автомат","180 л.с.","5 мест","Бензин"]]},
  {"name":"Mercedes-Benz C-Class","slug":"mercedes","n":5,"prices":[100,90,80],"cls":["Premium Coupe","Премиум-купе"],"tag":["Arrive in style along the promenade","Прибывайте с шиком по набережной"],"specs":[["Automatic","4 seats","Leather","Premium"],["Автомат","4 места","Кожа","Премиум"]]},
  {"name":"Subaru Forester Sport (Black)","slug":"forester","n":5,"prices":[65,60,55],"cls":["AWD SUV","Полный привод"],"tag":["All-wheel drive for mountain roads","Полный привод для горных дорог"],"specs":[["Automatic","5 seats","AWD","Petrol"],["Автомат","5 мест","4WD","Бензин"]]},
  {"name":"Subaru Forester Sport (Silver)","slug":"forester-silver","n":5,"prices":[65,60,55],"cls":["AWD SUV","Полный привод"],"tag":["Grippy AWD, ready for any road","Уверенный полный привод для любых дорог"],"specs":[["Automatic","5 seats","AWD","Petrol"],["Автомат","5 мест","4WD","Бензин"]]},
  {"name":"Subaru Outback","slug":"outback","n":5,"prices":[60,55,50],"cls":["AWD Wagon","Полный привод"],"tag":["Comfortable AWD cruiser with room to spare","Комфортный полноприводный универсал"],"specs":[["Automatic","5 seats","AWD","Petrol"],["Автомат","5 мест","4WD","Бензин"]]},
  {"name":"Jeep Compass","slug":"compass","n":5,"prices":[60,55,50],"cls":["Compact SUV","Компакт-кроссовер"],"tag":["Stylish 4x4 for city and coast","Стильный 4x4 для города и побережья"],"specs":[["Automatic","5 seats","4x4","Petrol"],["Автомат","5 мест","4x4","Бензин"]]},
  {"name":"Mitsubishi Outlander","slug":"outlander","n":6,"prices":[70,65,60],"cls":["Family SUV","Семейный кроссовер"],"tag":["Space for the whole family & luggage","Простор для всей семьи и багажа"],"specs":[["Automatic","5 seats","Roomy","Petrol"],["Автомат","5 мест","Просторный","Бензин"]]},
  {"name":"Jeep Renegade","slug":"jeep","n":6,"prices":[55,50,40],"cls":["Compact SUV","Компакт-кроссовер"],"tag":["Rugged & fun for city and trails","Дерзкий кроссовер для города и трасс"],"specs":[["Automatic","5 seats","4x4","Petrol"],["Автомат","5 мест","4x4","Бензин"]]},
  {"name":"BMW X1","slug":"bmw-x1","n":6,"prices":[75,70,60],"cls":["Compact SUV","Компакт-кроссовер"],"tag":["Agile, premium & easy to park","Манёвренный и премиальный"],"specs":[["Automatic","5 seats","Sport","Petrol"],["Автомат","5 мест","Спорт","Бензин"]]},
  {"name":"Mitsubishi Outlander Sport","slug":"asx","n":6,"prices":[60,50,40],"cls":["Compact SUV","Компакт-кроссовер"],"tag":["Nimble city SUV, easy on fuel","Юркий городской кроссовер"],"specs":[["Automatic","5 seats","Compact","Petrol"],["Автомат","5 мест","Компакт","Бензин"]]},
  {"name":"Ford Escape Hybrid","slug":"ford-escape","n":5,"prices":[37,33,30],"cls":["Economy Hybrid","Гибрид"],"tag":["Low fuel costs, go further for less","Экономичный расход топлива"],"specs":[["Automatic","5 seats","Hybrid","Eco"],["Автомат","5 мест","Гибрид","Эко"]]}
];
const I = {
 "en": {
  "top_address": "Zhiuli Shartava St. 16, Batumi 6010",
  "top_hours": "Open 24/7 — Support around the clock",
  "top_pay": "We accept USD · EUR · GEL · USDT",
  "nav_fleet": "Fleet",
  "nav_why": "Why Us",
  "nav_terms": "Terms",
  "nav_travel": "Travel",
  "nav_contact": "Contact",
  "nav_book": "Book Now",
  "hero_eyebrow": "Car Rental in Batumi · Georgia",
  "hero_t1": "Drive Georgia",
  "hero_t2": "your way.",
  "hero_sub": "Premium cars, delivered free to your door — no deposit, full CASCO insurance, and real 24/7 support. Your journey along the Black Sea coast starts here.",
  "hero_explore": "Explore the Fleet",
  "hero_wa": "Chat on WhatsApp",
  "hero_rating": "· {n} reviews on Google",
  "badge_no": "No",
  "badge_deposit": "Deposit",
  "badge_support": "Support",
  "badge_free": "Free",
  "badge_delivery": "Delivery",
  "badge_cover": "Full Cover",
  "adv_kicker": "Why Lucky Rental Car",
  "adv_h": "Everything included. Nothing to worry about.",
  "adv_p": "We built our service around a simple idea — renting a car in Batumi should feel effortless from the first message to the last kilometre.",
  "adv_f1_h": "Zero Deposit",
  "adv_f1_p": "Book any car with no blocked deposit on your card. Just your driver's licence and passport — and you're on the road.",
  "adv_f2_h": "Full CASCO Insurance",
  "adv_f2_p": "Every rental includes complete CASCO coverage, so you can drive the coast and the mountains with total peace of mind.",
  "adv_f3_h": "Free Delivery in Batumi",
  "adv_f3_p": "Airport, hotel, or apartment — we bring the car to you anywhere in Batumi, completely free of charge.",
  "adv_f4_h": "24/7 Live Support",
  "adv_f4_p": "A real person on WhatsApp or Telegram, day or night. Questions, extensions, roadside help — we've got you.",
  "adv_f5_h": "Pay Your Way",
  "adv_f5_p": "We accept USD, EUR, GEL and USDT. Flexible payment for travellers from anywhere in the world.",
  "adv_f6_h": "Clean, Fresh Fleet",
  "adv_f6_p": "Modern, well-maintained cars — sedans, SUVs and premium models — detailed and ready before every trip.",
  "stat_open": "Always open",
  "stat_cars": "Cars in fleet",
  "stat_casco": "CASCO covered",
  "stat_deposit": "Deposit required",
  "fleet_kicker": "Our Fleet",
  "fleet_h": "Choose your ride",
  "fleet_p": "From economical hybrids to premium coupes — hand-picked cars for every kind of Batumi trip. Tap any car to book instantly.",
  "fleet_note": "Prices are per-day and drop for longer rentals. Message us for an exact quote and current availability.",
  "fleet_day": "per day",
  "fleet_book": "Book now",
  "fleet_rentalDays": "Rental period",
  "fleet_help_h": "Not sure which car to choose?",
  "fleet_help_p": "Send us your dates and plans — we'll suggest the right car and give you an exact quote.",
  "fleet_help_cta": "Ask on WhatsApp",
  "promo_badge": "Birthday Special",
  "promo_h": "10% OFF for birthday guests",
  "promo_p": "Renting during your birthday? Show your passport when booking and enjoy 10% off as our gift to you.",
  "promo_cta": "Claim your discount",
  "terms_kicker": "Rental Terms",
  "terms_h": "Simple, transparent conditions",
  "terms_p": "No surprises — here's everything you need to rent with Lucky Rental Car.",
  "terms_t1": "Driver's age — from 21 years old.",
  "terms_t2": "Minimum driving experience — 2 years.",
  "terms_t3": "Passport and driver's licence are required for registration.",
  "terms_t4": "The car is provided clean and with a certain fuel level — please return it in the same condition.",
  "terms_t5": "The renter is responsible for traffic fines, violations and any damage during the rental, per the agreement.",
  "terms_t6": "Booking is confirmed after the dates are agreed and a prepayment is made.",
  "travel_kicker": "Discover Batumi",
  "travel_h": "Where your car can take you",
  "travel_p": "The Adjara region is made for road trips — waterfalls, beaches and mountain villages, all within an easy drive.",
  "travel_d1_h": "Makhuntseti Waterfall",
  "travel_d1_p": "A 30 m waterfall and a stone bridge from the era of Queen Tamar — about 30 km from Batumi.",
  "travel_d2_h": "Mirveti Waterfall",
  "travel_d2_p": "A hidden green gorge with a peaceful cascade — perfect for a summer escape.",
  "travel_d3_h": "Sarpi Beach",
  "travel_d3_p": "Crystal-clear water at the Turkish border — one of the cleanest beaches on the coast.",
  "travel_d4_h": "Tsikhisdziri",
  "travel_d4_p": "Dramatic cliffs, sea views and the ruins of the Petra fortress just north of the city.",
  "travel_d5_h": "Gonio Fortress",
  "travel_d5_p": "An ancient Roman fort and quiet pebble beach, 15 minutes south of Batumi.",
  "travel_d6_h": "Batumi Boulevard",
  "travel_d6_p": "7 km of seaside promenade, palm trees, fountains and cafés right in the heart of town.",
  "rev_kicker": "Reviews",
  "rev_h": "What our guests say",
  "rev_count": "Based on {n} reviews on Google",
  "rev_src": "Google review",
  "rev_all": "Read all reviews on Google",
  "rev_r1": "“Fast and good service, without deposit I rented a car, thank you!”",
  "rev_r2": "“Excellent company! The car was in perfect condition, everything clean and in good working order. The service was excellent — pickup, registration and return were quick and hassle-free.”",
  "rev_r3": "“We rented a 7-seater car for a reasonable price and were very satisfied. Highly recommend!”",
  "about_badge": "Since day one in Batumi",
  "about_kicker": "About Us",
  "about_h": "Your local car-rental partner on the Georgian coast",
  "about_p": "Lucky Rental Car is a Batumi-based rental service built for travellers who want freedom without the fine print. We know these roads — the drive to Sarpi, the climb to the mountain villages, the coastal run to Kobuleti — and we make sure your car is ready for all of it.",
  "about_li1": "Personal handover and full walkthrough of your car",
  "about_li2": "Flexible pick-up and drop-off across Batumi",
  "about_li3": "Transparent terms — driver from 21, licence from 2 years",
  "about_li4": "Trusted by visitors from across the region",
  "about_cta": "Book your car",
  "faq_kicker": "FAQ",
  "faq_h": "Frequently asked questions",
  "faq_p": "Everything you need to know about renting a car in Batumi with Lucky Rental Car.",
  "faq_q1": "Do I need a deposit to rent a car in Batumi?",
  "faq_a1": "No. Every car at Lucky Rental Car is rented with zero deposit — no money is blocked on your card.",
  "faq_q2": "What documents do I need?",
  "faq_a2": "A valid passport and driver's licence. The driver must be at least 21 years old with a minimum of 2 years' driving experience.",
  "faq_q3": "Do you deliver the car to the airport or my hotel?",
  "faq_a3": "Yes — delivery is free anywhere in Batumi, including the airport, your hotel or apartment. Delivery outside Batumi is available for a small additional fee.",
  "faq_q4": "Is insurance included in the price?",
  "faq_a4": "Yes. Every rental includes full CASCO insurance, so you're covered on the coast and in the mountains.",
  "faq_q5": "Which payment methods do you accept?",
  "faq_a5": "We accept USD, EUR, GEL and USDT — flexible options for travellers from anywhere in the world.",
  "faq_q6": "How do I book a car?",
  "faq_a6": "Just message us on WhatsApp or Telegram with your dates and preferred car. Your booking is confirmed once the dates are agreed and a prepayment is made.",
  "contact_kicker": "Get in touch",
  "contact_h": "Book in one message",
  "contact_p": "Pick your favourite app and message us — we usually reply within minutes, 24/7.",
  "contact_fb": "Follow us on Facebook",
  "info_loc": "Location",
  "info_loc_1": "Zhiuli Shartava St. 16",
  "info_loc_2": "Batumi 6010, Georgia",
  "info_hours": "Hours",
  "info_hours_1": "Open 24 hours",
  "info_hours_2": "7 days a week",
  "info_terms": "Rental terms",
  "info_terms_1": "Driver from 21 years",
  "info_terms_2": "Licence from 2 years",
  "info_pay": "Payment",
  "info_pay_1": "USD · EUR · GEL · USDT",
  "info_pay_2": "No card deposit",
  "map_directions": "Get directions",
  "foot_about": "Premium car rental in Batumi, Georgia. No deposit · Full CASCO · Free delivery · 24/7 support.",
  "foot_explore": "Explore",
  "foot_contact": "Contact",
  "foot_visit": "Visit",
  "foot_visit_1": "Zhiuli Shartava 16",
  "foot_visit_2": "Batumi 6010, Georgia",
  "foot_made": "Made with ☘ on the Black Sea coast",
  "msg_generic": "Hello Lucky Rental Car! I'd like to rent a car in Batumi.",
  "meta_title": "Car Rental in Batumi — No Deposit, 24/7 | Lucky Rental Car Georgia",
  "meta_description": "Rent a car in Batumi, Georgia with Lucky Rental Car. No deposit, full CASCO insurance, free delivery to your hotel or the airport, and 24/7 support. Sedans & SUVs from $30/day — book on WhatsApp or Telegram."
 },
 "ru": {
  "top_address": "ул. Жиули Шартава 16, Батуми 6010",
  "top_hours": "Работаем 24/7 — Поддержка круглосуточно",
  "top_pay": "Принимаем USD · EUR · GEL · USDT",
  "nav_fleet": "Автопарк",
  "nav_why": "Преимущества",
  "nav_terms": "Условия",
  "nav_travel": "Куда поехать",
  "nav_contact": "Контакты",
  "nav_book": "Забронировать",
  "hero_eyebrow": "Аренда авто в Батуми · Грузия",
  "hero_t1": "Открой Грузию",
  "hero_t2": "по-своему.",
  "hero_sub": "Премиум-авто с бесплатной доставкой к вам — без залога, с полным покрытием КАСКО и реальной поддержкой 24/7. Ваше путешествие по побережью Чёрного моря начинается здесь.",
  "hero_explore": "Смотреть автопарк",
  "hero_wa": "Написать в WhatsApp",
  "hero_rating": "· {n} отзыва в Google",
  "badge_no": "Без",
  "badge_deposit": "залога",
  "badge_support": "Поддержка",
  "badge_free": "Бесплатно",
  "badge_delivery": "Доставка",
  "badge_cover": "Полное КАСКО",
  "adv_kicker": "Почему Lucky Rental Car",
  "adv_h": "Всё включено. Никаких забот.",
  "adv_p": "Мы построили сервис вокруг простой идеи — аренда авто в Батуми должна быть лёгкой от первого сообщения до последнего километра.",
  "adv_f1_h": "Без залога",
  "adv_f1_p": "Бронируйте любое авто без блокировки залога на карте. Нужны только права и паспорт — и вы в пути.",
  "adv_f2_h": "Полное КАСКО",
  "adv_f2_p": "Каждая аренда включает полное покрытие КАСКО — езжайте по побережью и в горы с полным спокойствием.",
  "adv_f3_h": "Бесплатная доставка по Батуми",
  "adv_f3_p": "Аэропорт, отель или квартира — привезём авто в любую точку Батуми совершенно бесплатно.",
  "adv_f4_h": "Поддержка 24/7",
  "adv_f4_p": "Живой человек в WhatsApp или Telegram в любое время суток. Вопросы, продление, помощь на дороге — мы рядом.",
  "adv_f5_h": "Удобная оплата",
  "adv_f5_p": "Принимаем USD, EUR, GEL и USDT. Гибкая оплата для путешественников со всего мира.",
  "adv_f6_h": "Чистый автопарк",
  "adv_f6_p": "Современные ухоженные авто — седаны, кроссоверы и премиум-модели — вымыты и готовы к каждой поездке.",
  "stat_open": "Всегда открыты",
  "stat_cars": "Авто в автопарке",
  "stat_casco": "Покрытие КАСКО",
  "stat_deposit": "Депозит",
  "fleet_kicker": "Наш автопарк",
  "fleet_h": "Выберите автомобиль",
  "fleet_p": "От экономичных гибридов до премиум-купе — авто под любую поездку по Батуми. Нажмите на машину, чтобы забронировать.",
  "fleet_note": "Цены указаны за сутки и снижаются при длительной аренде. Напишите нам для точного расчёта и наличия.",
  "fleet_day": "в сутки",
  "fleet_book": "Забронировать",
  "fleet_rentalDays": "Срок аренды",
  "fleet_help_h": "Не знаете, какую машину выбрать?",
  "fleet_help_p": "Напишите даты и планы на поездку — подберём авто и пришлём точный расчёт.",
  "fleet_help_cta": "Спросить в WhatsApp",
  "promo_badge": "Специально ко дню рождения",
  "promo_h": "Скидка 10% для именинников",
  "promo_p": "Арендуете авто в свой день рождения? Покажите паспорт при оформлении и получите скидку 10% в подарок.",
  "promo_cta": "Получить скидку",
  "terms_kicker": "Условия аренды",
  "terms_h": "Простые и прозрачные условия",
  "terms_p": "Никаких сюрпризов — вот всё, что нужно для аренды в Lucky Rental Car.",
  "terms_t1": "Возраст водителя — от 21 года.",
  "terms_t2": "Водительский стаж — от 2 лет.",
  "terms_t3": "Для оформления необходимы паспорт и водительское удостоверение.",
  "terms_t4": "Автомобиль передаётся чистым и с определённым уровнем топлива — просим вернуть его в таком же состоянии.",
  "terms_t5": "Штрафы, нарушения ПДД и ответственность за повреждения во время аренды несёт арендатор согласно договору.",
  "terms_t6": "Бронирование осуществляется после подтверждения дат и внесения предоплаты.",
  "travel_kicker": "Откройте Батуми",
  "travel_h": "Куда можно доехать на авто",
  "travel_p": "Аджария создана для автопутешествий — водопады, пляжи и горные деревни, и всё в лёгкой доступности.",
  "travel_d1_h": "Водопад Махунцети",
  "travel_d1_p": "Водопад высотой 30 м и каменный мост эпохи царицы Тамары — около 30 км от Батуми.",
  "travel_d2_h": "Водопад Мирвети",
  "travel_d2_p": "Укромное зелёное ущелье со спокойным каскадом — идеально для летнего отдыха.",
  "travel_d3_h": "Пляж Сарпи",
  "travel_d3_p": "Кристально чистая вода у турецкой границы — один из самых чистых пляжей побережья.",
  "travel_d4_h": "Цихисдзири",
  "travel_d4_p": "Живописные скалы, виды на море и руины крепости Петра к северу от города.",
  "travel_d5_h": "Крепость Гонио",
  "travel_d5_p": "Древняя римская крепость и тихий галечный пляж в 15 минутах к югу от Батуми.",
  "travel_d6_h": "Батумский бульвар",
  "travel_d6_p": "7 км морской набережной с пальмами, фонтанами и кафе в самом сердце города.",
  "rev_kicker": "Отзывы",
  "rev_h": "Что говорят гости",
  "rev_count": "На основе {n} отзывов в Google",
  "rev_src": "Отзыв в Google",
  "rev_all": "Все отзывы в Google",
  "rev_r1": "“Быстрый и хороший сервис, взял авто без залога, спасибо!”",
  "rev_r2": "“Отличная компания! Машина в идеальном состоянии, всё чистое и исправное. Отличный сервис — подача, оформление и возврат быстро и без хлопот.”",
  "rev_r3": "“Взяли 7-местную машину по адекватной цене, остались очень довольны. Рекомендую!”",
  "about_badge": "С первого дня в Батуми",
  "about_kicker": "О нас",
  "about_h": "Ваш местный партнёр по аренде авто на побережье Грузии",
  "about_p": "Lucky Rental Car — сервис аренды в Батуми для тех, кто ценит свободу без мелкого шрифта. Мы знаем эти дороги — путь в Сарпи, подъём в горные деревни, поездку вдоль побережья в Кобулети — и готовим авто ко всему этому.",
  "about_li1": "Личная передача авто и подробный осмотр",
  "about_li2": "Гибкая подача и возврат по всему Батуми",
  "about_li3": "Прозрачные условия — водитель от 21 года, стаж от 2 лет",
  "about_li4": "Нам доверяют гости со всего региона",
  "about_cta": "Забронировать авто",
  "faq_kicker": "Вопросы",
  "faq_h": "Частые вопросы",
  "faq_p": "Всё, что нужно знать об аренде авто в Батуми с Lucky Rental Car.",
  "faq_q1": "Нужен ли залог для аренды авто в Батуми?",
  "faq_a1": "Нет. Все авто в Lucky Rental Car сдаются без залога — на вашей карте ничего не блокируется.",
  "faq_q2": "Какие документы нужны?",
  "faq_a2": "Действующий паспорт и водительское удостоверение. Водителю должно быть не менее 21 года со стажем вождения от 2 лет.",
  "faq_q3": "Доставляете ли авто в аэропорт или в отель?",
  "faq_a3": "Да — доставка бесплатна в любую точку Батуми, включая аэропорт, отель или квартиру. Доставка за пределы Батуми возможна за небольшую доплату.",
  "faq_q4": "Входит ли страховка в стоимость?",
  "faq_a4": "Да. Каждая аренда включает полное КАСКО — вы защищены и на побережье, и в горах.",
  "faq_q5": "Какие способы оплаты вы принимаете?",
  "faq_a5": "Мы принимаем USD, EUR, GEL и USDT — удобные варианты для путешественников со всего мира.",
  "faq_q6": "Как забронировать авто?",
  "faq_a6": "Просто напишите нам в WhatsApp или Telegram, укажите даты и желаемое авто. Бронь подтверждается после согласования дат и внесения предоплаты.",
  "contact_kicker": "Связаться с нами",
  "contact_h": "Бронируйте в одно сообщение",
  "contact_p": "Выберите удобное приложение и напишите нам — обычно отвечаем за пару минут, 24/7.",
  "contact_fb": "Мы в Facebook",
  "info_loc": "Адрес",
  "info_loc_1": "ул. Жиули Шартава 16",
  "info_loc_2": "Батуми 6010, Грузия",
  "info_hours": "Часы работы",
  "info_hours_1": "Круглосуточно",
  "info_hours_2": "7 дней в неделю",
  "info_terms": "Условия аренды",
  "info_terms_1": "Водитель от 21 года",
  "info_terms_2": "Стаж от 2 лет",
  "info_pay": "Оплата",
  "info_pay_1": "USD · EUR · GEL · USDT",
  "info_pay_2": "Без залога на карте",
  "map_directions": "Построить маршрут",
  "foot_about": "Премиум-аренда авто в Батуми, Грузия. Без залога · Полное КАСКО · Бесплатная доставка · Поддержка 24/7.",
  "foot_explore": "Разделы",
  "foot_contact": "Контакты",
  "foot_visit": "Адрес",
  "foot_visit_1": "ул. Жиули Шартава 16",
  "foot_visit_2": "Батуми 6010, Грузия",
  "foot_made": "Сделано с ☘ на побережье Чёрного моря",
  "msg_generic": "Здравствуйте, Lucky Rental Car! Хочу арендовать авто в Батуми.",
  "meta_title": "Аренда авто в Батуми — без залога, 24/7 | Lucky Rental Car",
  "meta_description": "Аренда авто в Батуми, Грузия с Lucky Rental Car. Без залога, полное КАСКО, бесплатная доставка в отель или аэропорт и поддержка 24/7. Седаны и кроссоверы от $30/сутки — бронируйте в WhatsApp или Telegram."
 }
};

const SITE_BASE = 'https://luckyrent.ge/';
const tiers = CARS.map(() => 0);   /* selected rental-period tier per car */

let LANG = new URLSearchParams(location.search).get('lang')
  || (()=>{ try{ return localStorage.getItem('lang'); }catch(e){} })()
  || (navigator.language || 'en').slice(0, 2).toLowerCase();
if (LANG !== 'ru') LANG = 'en';

const t = k => I[LANG][k] ?? I.en[k] ?? k;
const kk = () => LANG === 'ru' ? 1 : 0;
const waLink = msg => `${WA}?text=${encodeURIComponent(msg)}`;

const V = {
  ratingNum: () => LANG === 'ru' ? REVIEWS.rating.replace('.', ',') : REVIEWS.rating,
  heroRating: () => t('hero_rating').replace('{n}', REVIEWS.count),
  revCount: () => t('rev_count').replace('{n}', REVIEWS.count)
};

/* ---- Fleet cards ---- */
function bookMsg(c, ti){
  const tier = TIERS[ti][kk()], p = c.prices[ti];
  return LANG === 'ru'
    ? `Здравствуйте, Lucky Rental Car! Хочу забронировать ${c.name} на ${tier} — $${p}/сутки. Есть в наличии?`
    : `Hello Lucky Rental Car! I'd like to book the ${c.name} for ${tier} — $${p}/day. Is it available?`;
}
function cardData(c, ci){
  const k = kk(), ti = tiers[ci], msg = encodeURIComponent(bookMsg(c, ti));
  return { name:c.name, cls:c.cls[k], tag:c.tag[k], specLine:c.specs[k].join('  ·  '),
    photo:`images/car-${c.slug}-1.jpg`, count:c.n, price:`$${c.prices[ti]}`,
    alt: LANG === 'ru' ? `Аренда ${c.name} в Батуми — Lucky Rental Car` : `Rent ${c.name} in Batumi — Lucky Rental Car`,
    wa:`${WA}?text=${msg}`, tg:`${TG}?text=${msg}` };
}
const tierTpl = (label, j, on) => `<button type="button" class="tb${on?' on':''}" data-t="${j}" style="height:36px;border:0;border-radius:9px;cursor:pointer;font-size:.8125rem;font-weight:600;white-space:nowrap;transition:background .25s,color .25s">${label}</button>`;
const cardTpl = (c, ci, tiers, L) => `<article class="h15" data-car="${ci}" style="display:flex;flex-direction:column;background:#0b2138;border:1px solid rgba(255,255,255,.07);border-radius:20px;overflow:hidden;transition:transform .45s cubic-bezier(.22,.61,.36,1),border-color .3s,box-shadow .45s">
<div style="position:relative;aspect-ratio:16/10.5;overflow:hidden;background:#0e2841;cursor:pointer" data-gallery role="button" tabindex="0" aria-label="${c.alt}">
<img src="${c.photo}" alt="${c.alt}" width="1200" height="825" loading="lazy" style="width:100%;height:100%;object-fit:cover" />
<span style="position:absolute;top:14px;left:14px;background:rgba(6,18,30,.66);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.75rem;font-weight:600;letter-spacing:.06em;padding:6px 12px;border-radius:100px;line-height:1.4;white-space:nowrap">${c.cls}</span>
<span style="position:absolute;bottom:14px;right:14px;display:inline-flex;align-items:center;gap:6px;background:rgba(6,18,30,.66);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.75rem;font-weight:600;padding:6px 11px;border-radius:100px;line-height:1.4"><svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px;fill:currentColor"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9zm3 5.5A4.5 4.5 0 1 1 12 17a4.5 4.5 0 0 1 0-9zm0 2A2.5 2.5 0 1 0 12 15a2.5 2.5 0 0 0 0-5z"></path></svg>${c.count}</span>
</div>
<div style="display:flex;flex-direction:column;gap:16px;padding:22px 22px 22px">
<div>
<h3 style="font-family:'Geologica',sans-serif;font-size:1.3125rem;font-weight:500;line-height:1.2;letter-spacing:-.02em">${c.name}</h3>
<p style="color:#afbfce;font-size:.9375rem;line-height:1.5;margin-top:6px">${c.tag}</p>
</div>
<p style="font-size:.875rem;color:#c4d1de;line-height:1.4">${c.specLine}</p>
<div>
<span style="display:block;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#8fa3b8;margin-bottom:8px">${L.fleet_rentalDays}</span>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06)">
${tiers}
</div>
</div>
<div style="display:flex;flex-direction:column;gap:14px;padding-top:16px;border-top:1px solid rgba(255,255,255,.07)">
<div style="display:flex;align-items:baseline;gap:6px;line-height:1">
<b data-cp style="font-family:'Geologica',sans-serif;font-size:1.875rem;font-weight:500;letter-spacing:-.03em;font-variant-numeric:tabular-nums">${c.price}</b>
<span style="font-size:.875rem;color:#afbfce;white-space:nowrap">${L.fleet_day}</span>
</div>
<div style="display:flex;flex-direction:row-reverse;align-items:center;gap:8px">
<a class="h16" data-ctg href="${c.tg}" target="_blank" rel="noopener" aria-label="Telegram" style="width:48px;height:48px;flex:none;display:grid;place-items:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;transition:border-color .25s,background .25s"><svg viewBox="0 0 32 32" aria-hidden="true" style="width:19px;height:19px;fill:#29a9ea"><path d="M26.6 5.3 3.6 14.1c-1.4.6-1.4 1.4-.3 1.7l5.9 1.8 2.3 7c.3.8.5 1 1 1s.9-.3 1.4-.8l3.3-3.2 5.9 4.3c1.1.6 1.9.3 2.1-1l3.9-18.3c.4-1.6-.7-2.4-2.4-1.5zM11.2 17.6l12.4-7.8c.6-.4 1.1-.2.7.2l-10 9-.4 4.2z"></path></svg></a>
<a class="h5" data-cwa href="${c.wa}" target="_blank" rel="noopener" style="flex:1;min-width:0;display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 18px;border-radius:100px;background:#c6a86e;color:#1c160b;font-weight:600;font-size:.9375rem;white-space:nowrap;transition:background .3s">
<svg viewBox="-2.4 -2.4 28.8 28.8" style="width:17px;height:17px;fill:#1c160b;flex:none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
<span>${L.fleet_book}</span>
</a>
</div>
</div>
</div>
</article>`;
function cardHTML(c, ci){
  const tiersHTML = TIERS.map((tr, j) => tierTpl(tr[kk()], j, j === tiers[ci])).join('');
  return cardTpl(cardData(c, ci), ci, tiersHTML, I[LANG]);
}
function renderFleet(){
  const grid = document.getElementById('fleetGrid');
  grid.querySelectorAll('[data-car]').forEach(el => el.remove());
  grid.insertAdjacentHTML('afterbegin', CARS.map(cardHTML).join(''));
}

/* ---- Language ---- */
function syncSeoTags(){
  const selfUrl = LANG === 'ru' ? SITE_BASE + '?lang=ru' : SITE_BASE;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  document.title = t('meta_title');
  set('meta[name="description"]', 'content', t('meta_description'));
  set('#canonical', 'href', selfUrl);
  set('meta[property="og:url"]', 'content', selfUrl);
  set('meta[property="og:title"]', 'content', t('meta_title'));
  set('meta[property="og:description"]', 'content', t('meta_description'));
  set('meta[property="og:locale"]', 'content', LANG === 'ru' ? 'ru_RU' : 'en_US');
  set('meta[property="og:locale:alternate"]', 'content', LANG === 'ru' ? 'en_US' : 'ru_RU');
  set('meta[name="twitter:title"]', 'content', t('meta_title'));
  set('meta[name="twitter:description"]', 'content', t('meta_description'));
}
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-v]').forEach(el => { el.textContent = V[el.dataset.v](); });
  const wa = waLink(t('msg_generic'));
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = wa; });
  document.querySelectorAll('.lg').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  syncSeoTags();
  renderFleet();
}
function setLang(l){
  LANG = l === 'ru' ? 'ru' : 'en';
  try{ localStorage.setItem('lang', LANG); }catch(e){}
  try{ const u = new URL(location.href); if (LANG === 'ru') u.searchParams.set('lang', 'ru'); else u.searchParams.delete('lang'); history.replaceState(null, '', u); }catch(e){}
  applyLang();
}
document.querySelectorAll('.lg').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

/* ---- Fleet interactions (delegated): rental-period tier + photo gallery ---- */
document.getElementById('fleetGrid').addEventListener('click', e => {
  const tb = e.target.closest('.tb');
  if (tb){
    const card = tb.closest('[data-car]'), ci = +card.dataset.car, j = +tb.dataset.t;
    tiers[ci] = j;
    card.querySelectorAll('.tb').forEach(x => x.classList.toggle('on', x === tb));
    const d = cardData(CARS[ci], ci);
    card.querySelector('[data-cp]').textContent = d.price;
    card.querySelector('[data-cwa]').href = d.wa;
    card.querySelector('[data-ctg]').href = d.tg;
    return;
  }
  const g = e.target.closest('[data-gallery]');
  if (g) openLightbox(CARS[+g.closest('[data-car]').dataset.car], 0);
});
document.getElementById('fleetGrid').addEventListener('keydown', e => {
  const g = e.target.closest && e.target.closest('[data-gallery]');
  if (g && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); openLightbox(CARS[+g.closest('[data-car]').dataset.car], 0); }
});

/* ---- Mobile menu ---- */
const burger = document.getElementById('burger'), menu = document.getElementById('mobileMenu');
const setMenu = open => { menu.hidden = !open; burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ---- FAQ accordion (one open at a time) ---- */
const faqs = [...document.querySelectorAll('.fq')];
faqs.forEach(f => f.querySelector('button').addEventListener('click', () => {
  const open = !f.classList.contains('open');
  faqs.forEach(x => { x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded', false); });
  if (open){ f.classList.add('open'); f.querySelector('button').setAttribute('aria-expanded', true); }
}));

/* ---- Lightbox ---- */
const box = document.getElementById('lightbox'), boxImg = document.getElementById('lightboxImg'),
      boxCount = box.querySelector('.lbx-count');
let list = [], idx = 0;
const showPhoto = i => { idx = (i + list.length) % list.length; boxImg.src = list[idx]; boxImg.alt = list.name; boxCount.textContent = `${idx + 1} / ${list.length}`; };
const closeBox = () => { box.classList.remove('open'); box.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('no-scroll'); };
function openLightbox(c, start){
  list = Array.from({ length:c.n }, (_, i) => `images/car-${c.slug}-${i + 1}.jpg`);
  list.name = c.name;
  showPhoto(start);
  box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('no-scroll');
}
box.querySelector('.lbx-close').onclick = closeBox;
box.querySelector('.lbx-next').onclick = e => { e.stopPropagation(); showPhoto(idx + 1); };
box.querySelector('.lbx-prev').onclick = e => { e.stopPropagation(); showPhoto(idx - 1); };
box.addEventListener('click', e => { if (e.target === box) closeBox(); });
addEventListener('keydown', e => {
  if (!box.classList.contains('open')) return;
  if (e.key === 'Escape') closeBox();
  else if (e.key === 'ArrowRight') showPhoto(idx + 1);
  else if (e.key === 'ArrowLeft') showPhoto(idx - 1);
});
let sx = 0, sy = 0;
box.addEventListener('touchstart', e => { const p = e.changedTouches[0]; sx = p.clientX; sy = p.clientY; }, { passive:true });
box.addEventListener('touchend', e => {
  const p = e.changedTouches[0], dx = p.clientX - sx, dy = p.clientY - sy;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showPhoto(idx + (dx < 0 ? 1 : -1));
}, { passive:true });

applyLang();

/* ---- Analytics: one lead event per messenger click ---- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href*="wa.me"], a[href*="t.me"]');
  if (a && window.gtag) gtag('event', 'generate_lead', { method: a.href.includes('wa.me') ? 'whatsapp' : 'telegram' });
});
