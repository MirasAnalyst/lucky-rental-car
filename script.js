/* ============================================================
   Lucky Rental Car — interactions + EN/RU i18n
   ------------------------------------------------------------
   >>> EDIT YOUR CONTACT DETAILS HERE <<<
   ============================================================ */
const CONTACT = {
  whatsapp: "995555562877",      // WhatsApp number, digits only, incl. country code
  telegram: "995555562877",      // Telegram phone (+995 555 562 877) or a @username
  instagram: "lucky_rentalcar",  // Instagram handle
  facebook: "lucky_rentalcar",   // Facebook page slug — update if different
  phoneDisplay: "+995 555 562 877"
};

/* ---- Rental day tiers (price index maps to each car's `prices` array below) ---- */
const DAY_TIERS = [
  { key:"1-2",  en:"1–2 days",  ru:"1–2 дня"  },
  { key:"3-5",  en:"3–5 days",  ru:"3–5 дней" },
  { key:"6-10", en:"6–10 days", ru:"6–10 дней"}
];

/* photos: [front/main, ...more angles]. Add/remove files in images/ and update the count. */
const P = (slug,n) => Array.from({length:n},(_,i)=>`images/car-${slug}-${i+1}.jpg`);

/* ---- Fleet data (bilingual). prices = [1-2d, 3-5d, 6-10d] per day in USD. ---- */
const FLEET = [
  { name:"Hyundai Sonata", photos:P('sonata',6), prices:[60,50,45],
    cls:{en:"Comfort Sedan",ru:"Комфорт-седан"},
    tag:{en:"Smooth, quiet 180 HP cruiser for the coast",ru:"Тихий и плавный седан 180 л.с."},
    specs:{en:["Automatic","180 HP","5 seats","Petrol"],ru:["Автомат","180 л.с.","5 мест","Бензин"]} },
  { name:"Mercedes-Benz C-Class", photos:P('mercedes',5), prices:[100,90,80],
    cls:{en:"Premium Coupe",ru:"Премиум-купе"},
    tag:{en:"Arrive in style along the promenade",ru:"Прибывайте с шиком по набережной"},
    specs:{en:["Automatic","4 seats","Leather","Premium"],ru:["Автомат","4 места","Кожа","Премиум"]} },
  { name:"Subaru Forester Sport", photos:P('forester',5), prices:[65,60,55],
    cls:{en:"AWD SUV",ru:"Полный привод"},
    tag:{en:"All-wheel drive for mountain roads",ru:"Полный привод для горных дорог"},
    specs:{en:["Automatic","5 seats","AWD","Petrol"],ru:["Автомат","5 мест","4WD","Бензин"]} },
  { name:"Mitsubishi Outlander", photos:P('outlander',6), prices:[70,65,60],
    cls:{en:"Family SUV",ru:"Семейный кроссовер"},
    tag:{en:"Space for the whole family & luggage",ru:"Простор для всей семьи и багажа"},
    specs:{en:["Automatic","5 seats","Roomy","Petrol"],ru:["Автомат","5 мест","Просторный","Бензин"]} },
  { name:"Jeep Renegade", photos:P('jeep',6), prices:[55,50,40],
    cls:{en:"Compact SUV",ru:"Компакт-кроссовер"},
    tag:{en:"Rugged & fun for city and trails",ru:"Дерзкий кроссовер для города и трасс"},
    specs:{en:["Automatic","5 seats","4x4","Petrol"],ru:["Автомат","5 мест","4x4","Бензин"]} },
  { name:"BMW X1", photos:P('bmw-x1',6), prices:[75,70,60],
    cls:{en:"Compact SUV",ru:"Компакт-кроссовер"},
    tag:{en:"Agile, premium & easy to park",ru:"Манёвренный и премиальный"},
    specs:{en:["Automatic","5 seats","Sport","Petrol"],ru:["Автомат","5 мест","Спорт","Бензин"]} },
  { name:"Mitsubishi Outlander Sport", photos:P('asx',6), prices:[60,50,40],
    cls:{en:"Compact SUV",ru:"Компакт-кроссовер"},
    tag:{en:"Nimble city SUV, easy on fuel",ru:"Юркий городской кроссовер"},
    specs:{en:["Automatic","5 seats","Compact","Petrol"],ru:["Автомат","5 мест","Компакт","Бензин"]} },
  { name:"Ford Escape Hybrid", photos:P('ford-escape',5), prices:[55,50,45],
    cls:{en:"Economy Hybrid",ru:"Гибрид"},
    tag:{en:"Low fuel costs, go further for less",ru:"Экономичный расход топлива"},
    specs:{en:["Automatic","5 seats","Hybrid","Eco"],ru:["Автомат","5 мест","Гибрид","Эко"]} }
];
/* Remembers each car's selected day-tier across re-renders (e.g. language switch) */
const carTier = FLEET.map(()=>0);

/* Shared lightbox opener (assigned in initLightbox) + Lenis handle for scroll-lock */
let openLightbox = () => {};
let lenisInstance = null;

/* ---- Translations ---- */
const I18N = {
  en: {
    "meta.title":"Car Rental in Batumi — No Deposit, 24/7 | Lucky Rental Car Georgia",
    "meta.description":"Rent a car in Batumi, Georgia with Lucky Rental Car. No deposit, full CASCO insurance, free delivery to your hotel or the airport, and 24/7 support. Sedans & SUVs from $40/day — book on WhatsApp or Telegram.",
    "top.address":"Zhiuli Shartava St. 16, Batumi 6010",
    "top.hours":"Open 24/7 — Support around the clock",
    "top.pay":"We accept USD · EUR · GEL · USDT",
    "nav.fleet":"Fleet","nav.why":"Why Us","nav.terms":"Terms","nav.travel":"Travel","nav.gallery":"Gallery","nav.contact":"Contact","nav.book":"Book Now",
    "hero.eyebrow":"☘ Car Rental in Batumi · Georgia 🇬🇪",
    "hero.title":"Drive Georgia <span>your way.</span>",
    "hero.sub":"Premium cars, delivered free to your door — no deposit, full CASCO insurance, and real 24/7 support. Your journey along the Black Sea coast starts here.",
    "hero.explore":"Explore the Fleet","hero.wa":"Chat on WhatsApp",
    "badge.no":"No","badge.deposit":"Deposit","badge.support":"Support","badge.free":"Free","badge.delivery":"Delivery","badge.cover":"Full Cover",
    "adv.kicker":"Why Lucky Rental Car","adv.h":"Everything included. Nothing to worry about.",
    "adv.p":"We built our service around a simple idea — renting a car in Batumi should feel effortless from the first message to the last kilometre.",
    "adv.f1.h":"Zero Deposit","adv.f1.p":"Book any car with no blocked deposit on your card. Just your driver's licence and passport — and you're on the road.",
    "adv.f2.h":"Full CASCO Insurance","adv.f2.p":"Every rental includes complete CASCO coverage, so you can drive the coast and the mountains with total peace of mind.",
    "adv.f3.h":"Free Delivery in Batumi","adv.f3.p":"Airport, hotel, or apartment — we bring the car to you anywhere in Batumi, completely free of charge.",
    "adv.f4.h":"24/7 Live Support","adv.f4.p":"A real person on WhatsApp or Telegram, day or night. Questions, extensions, roadside help — we've got you.",
    "adv.f5.h":"Pay Your Way","adv.f5.p":"We accept USD, EUR, GEL and USDT. Flexible payment for travellers from anywhere in the world.",
    "adv.f6.h":"Clean, Fresh Fleet","adv.f6.p":"Modern, well-maintained cars — sedans, SUVs and premium models — detailed and ready before every trip.",
    "stat.open":"Always open","stat.cars":"Cars in fleet","stat.casco":"CASCO covered","stat.deposit":"Deposit required",
    "fleet.kicker":"Our Fleet","fleet.h":"Choose your ride",
    "fleet.p":"From economical hybrids to premium coupes — hand-picked cars for every kind of Batumi trip. Tap any car to book instantly.",
    "fleet.note":"Prices are per-day and drop for longer rentals. Message us for an exact quote and current availability.",
    "fleet.from":"from","fleet.day":"per day","fleet.book":"Book","fleet.rentalDays":"Rental period",
    "promo.badge":"Birthday Special","promo.h":"10% OFF for birthday guests",
    "promo.p":"Renting during your birthday? Show your passport when booking and enjoy 10% off as our gift to you.",
    "promo.cta":"Claim your discount",
    "terms.kicker":"Rental Terms","terms.h":"Simple, transparent conditions","terms.p":"No surprises — here's everything you need to rent with Lucky Rental Car.",
    "terms.t1":"Driver's age — from 21 years old.",
    "terms.t2":"Minimum driving experience — 2 years.",
    "terms.t3":"Passport and driver's licence are required for registration.",
    "terms.t4":"The car is provided clean and with a certain fuel level — please return it in the same condition.",
    "terms.t5":"The renter is responsible for traffic fines, violations and any damage during the rental, per the agreement.",
    "terms.t6":"Booking is confirmed after the dates are agreed and a prepayment is made.",
    "travel.kicker":"Discover Batumi","travel.h":"Where your car can take you",
    "travel.p":"The Adjara region is made for road trips — waterfalls, beaches and mountain villages, all within an easy drive.",
    "travel.d1.h":"Makhuntseti Waterfall","travel.d1.p":"A 30 m waterfall and a stone bridge from the era of Queen Tamar — about 30 km from Batumi.",
    "travel.d2.h":"Mirveti Waterfall","travel.d2.p":"A hidden green gorge with a peaceful cascade — perfect for a summer escape.",
    "travel.d3.h":"Sarpi Beach","travel.d3.p":"Crystal-clear water at the Turkish border — one of the cleanest beaches on the coast.",
    "travel.d4.h":"Tsikhisdziri","travel.d4.p":"Dramatic cliffs, sea views and the ruins of the Petra fortress just north of the city.",
    "travel.d5.h":"Gonio Fortress","travel.d5.p":"An ancient Roman fort and quiet pebble beach, 15 minutes south of Batumi.",
    "travel.d6.h":"Batumi Boulevard","travel.d6.p":"7 km of seaside promenade, palm trees, fountains and cafés right in the heart of town.",
    "gal.kicker":"Gallery","gal.h":"The fleet in the wild","gal.p":"Real cars, real Batumi — palm-lined promenades, mountain roads and Black Sea sunsets.",
    "faq.kicker":"FAQ","faq.h":"Frequently asked questions","faq.p":"Everything you need to know about renting a car in Batumi with Lucky Rental Car.",
    "faq.q1":"Do I need a deposit to rent a car in Batumi?","faq.a1":"No. Every car at Lucky Rental Car is rented with zero deposit — no money is blocked on your card.",
    "faq.q2":"What documents do I need?","faq.a2":"A valid passport and driver's licence. The driver must be at least 21 years old with a minimum of 2 years' driving experience.",
    "faq.q3":"Do you deliver the car to the airport or my hotel?","faq.a3":"Yes — delivery is free anywhere in Batumi, including the airport, your hotel or apartment. Delivery outside Batumi is available for a small additional fee.",
    "faq.q4":"Is insurance included in the price?","faq.a4":"Yes. Every rental includes full CASCO insurance, so you're covered on the coast and in the mountains.",
    "faq.q5":"Which payment methods do you accept?","faq.a5":"We accept USD, EUR, GEL and USDT — flexible options for travellers from anywhere in the world.",
    "faq.q6":"How do I book a car?","faq.a6":"Just message us on WhatsApp or Telegram with your dates and preferred car. Your booking is confirmed once the dates are agreed and a prepayment is made.",
    "rev.kicker":"Reviews","rev.h":"What our guests say",
    "rev.q":"“Thank you for the lovely service! The car was great — really peppy, super trim, clean and with no odd smells. Special thanks for the water in the cabin and the fuel discount!”",
    "rev.by":"— Guest who rented the Subaru Forester",
    "about.badge":"Since day one in Batumi","about.kicker":"About Us","about.h":"Your local car-rental partner on the Georgian coast",
    "about.p":"Lucky Rental Car is a Batumi-based rental service built for travellers who want freedom without the fine print. We know these roads — the drive to Sarpi, the climb to the mountain villages, the coastal run to Kobuleti — and we make sure your car is ready for all of it.",
    "about.l1":"Personal handover and full walkthrough of your car",
    "about.l2":"Flexible pick-up and drop-off across Batumi",
    "about.l3":"Transparent terms — driver from 21, licence from 2 years",
    "about.l4":"Trusted by visitors from across the region",
    "about.cta":"Book your car",
    "contact.kicker":"Get in touch","contact.h":"Book in one message","contact.p":"Pick your favourite app and message us — we usually reply within minutes, 24/7.",
    "contact.fb":"Follow us on Facebook",
    "info.loc":"Location","info.loc.v":"Zhiuli Shartava St. 16<br />Batumi 6010, Georgia 🇬🇪",
    "info.hours":"Hours","info.hours.v":"Open 24 hours<br />7 days a week",
    "info.terms":"Rental terms","info.terms.v":"Driver from 21 years<br />Licence from 2 years",
    "info.pay":"Payment","info.pay.v":"USD · EUR · GEL · USDT<br />No card deposit",
    "map.directions":"Get directions",
    "foot.about":"Premium car rental in Batumi, Georgia. No deposit · Full CASCO · Free delivery · 24/7 support.",
    "foot.explore":"Explore","foot.contact":"Contact","foot.visit":"Visit","foot.visit.v":"Zhiuli Shartava 16<br />Batumi 6010, Georgia",
    "foot.made":"Made with ☘ on the Black Sea coast"
  },
  ru: {
    "meta.title":"Аренда авто в Батуми — без залога, 24/7 | Lucky Rental Car",
    "meta.description":"Аренда авто в Батуми, Грузия с Lucky Rental Car. Без залога, полное КАСКО, бесплатная доставка в отель или аэропорт и поддержка 24/7. Седаны и кроссоверы от $40/сутки — бронируйте в WhatsApp или Telegram.",
    "top.address":"ул. Жиули Шартава 16, Батуми 6010",
    "top.hours":"Работаем 24/7 — Поддержка круглосуточно",
    "top.pay":"Принимаем USD · EUR · GEL · USDT",
    "nav.fleet":"Автопарк","nav.why":"Преимущества","nav.terms":"Условия","nav.travel":"Куда поехать","nav.gallery":"Галерея","nav.contact":"Контакты","nav.book":"Забронировать",
    "hero.eyebrow":"☘ Аренда авто в Батуми · Грузия 🇬🇪",
    "hero.title":"Открой Грузию <span>по-своему.</span>",
    "hero.sub":"Премиум-авто с бесплатной доставкой к вам — без залога, с полным покрытием КАСКО и реальной поддержкой 24/7. Ваше путешествие по побережью Чёрного моря начинается здесь.",
    "hero.explore":"Смотреть автопарк","hero.wa":"Написать в WhatsApp",
    "badge.no":"Без","badge.deposit":"залога","badge.support":"Поддержка","badge.free":"Бесплатно","badge.delivery":"Доставка","badge.cover":"Полное КАСКО",
    "adv.kicker":"Почему Lucky Rental Car","adv.h":"Всё включено. Никаких забот.",
    "adv.p":"Мы построили сервис вокруг простой идеи — аренда авто в Батуми должна быть лёгкой от первого сообщения до последнего километра.",
    "adv.f1.h":"Без залога","adv.f1.p":"Бронируйте любое авто без блокировки залога на карте. Нужны только права и паспорт — и вы в пути.",
    "adv.f2.h":"Полное КАСКО","adv.f2.p":"Каждая аренда включает полное покрытие КАСКО — езжайте по побережью и в горы с полным спокойствием.",
    "adv.f3.h":"Бесплатная доставка по Батуми","adv.f3.p":"Аэропорт, отель или квартира — привезём авто в любую точку Батуми совершенно бесплатно.",
    "adv.f4.h":"Поддержка 24/7","adv.f4.p":"Живой человек в WhatsApp или Telegram в любое время суток. Вопросы, продление, помощь на дороге — мы рядом.",
    "adv.f5.h":"Удобная оплата","adv.f5.p":"Принимаем USD, EUR, GEL и USDT. Гибкая оплата для путешественников со всего мира.",
    "adv.f6.h":"Чистый автопарк","adv.f6.p":"Современные ухоженные авто — седаны, кроссоверы и премиум-модели — вымыты и готовы к каждой поездке.",
    "stat.open":"Всегда открыты","stat.cars":"Авто в автопарке","stat.casco":"Покрытие КАСКО","stat.deposit":"Депозит",
    "fleet.kicker":"Наш автопарк","fleet.h":"Выберите автомобиль",
    "fleet.p":"От экономичных гибридов до премиум-купе — авто под любую поездку по Батуми. Нажмите на машину, чтобы забронировать.",
    "fleet.note":"Цены указаны за сутки и снижаются при длительной аренде. Напишите нам для точного расчёта и наличия.",
    "fleet.from":"от","fleet.day":"в сутки","fleet.book":"Бронь","fleet.rentalDays":"Срок аренды",
    "promo.badge":"Специально ко дню рождения","promo.h":"Скидка 10% для именинников",
    "promo.p":"Арендуете авто в свой день рождения? Покажите паспорт при оформлении и получите скидку 10% в подарок.",
    "promo.cta":"Получить скидку",
    "terms.kicker":"Условия аренды","terms.h":"Простые и прозрачные условия","terms.p":"Никаких сюрпризов — вот всё, что нужно для аренды в Lucky Rental Car.",
    "terms.t1":"Возраст водителя — от 21 года.",
    "terms.t2":"Водительский стаж — от 2 лет.",
    "terms.t3":"Для оформления необходимы паспорт и водительское удостоверение.",
    "terms.t4":"Автомобиль передаётся чистым и с определённым уровнем топлива — просим вернуть его в таком же состоянии.",
    "terms.t5":"Штрафы, нарушения ПДД и ответственность за повреждения во время аренды несёт арендатор согласно договору.",
    "terms.t6":"Бронирование осуществляется после подтверждения дат и внесения предоплаты.",
    "travel.kicker":"Откройте Батуми","travel.h":"Куда можно доехать на авто",
    "travel.p":"Аджария создана для автопутешествий — водопады, пляжи и горные деревни, и всё в лёгкой доступности.",
    "travel.d1.h":"Водопад Махунцети","travel.d1.p":"Водопад высотой 30 м и каменный мост эпохи царицы Тамары — около 30 км от Батуми.",
    "travel.d2.h":"Водопад Мирвети","travel.d2.p":"Укромное зелёное ущелье со спокойным каскадом — идеально для летнего отдыха.",
    "travel.d3.h":"Пляж Сарпи","travel.d3.p":"Кристально чистая вода у турецкой границы — один из самых чистых пляжей побережья.",
    "travel.d4.h":"Цихисдзири","travel.d4.p":"Живописные скалы, виды на море и руины крепости Петра к северу от города.",
    "travel.d5.h":"Крепость Гонио","travel.d5.p":"Древняя римская крепость и тихий галечный пляж в 15 минутах к югу от Батуми.",
    "travel.d6.h":"Батумский бульвар","travel.d6.p":"7 км морской набережной с пальмами, фонтанами и кафе в самом сердце города.",
    "gal.kicker":"Галерея","gal.h":"Автопарк вживую","gal.p":"Реальные авто, реальный Батуми — набережные с пальмами, горные дороги и закаты у Чёрного моря.",
    "faq.kicker":"Вопросы","faq.h":"Частые вопросы","faq.p":"Всё, что нужно знать об аренде авто в Батуми с Lucky Rental Car.",
    "faq.q1":"Нужен ли залог для аренды авто в Батуми?","faq.a1":"Нет. Все авто в Lucky Rental Car сдаются без залога — на вашей карте ничего не блокируется.",
    "faq.q2":"Какие документы нужны?","faq.a2":"Действующий паспорт и водительское удостоверение. Водителю должно быть не менее 21 года со стажем вождения от 2 лет.",
    "faq.q3":"Доставляете ли авто в аэропорт или в отель?","faq.a3":"Да — доставка бесплатна в любую точку Батуми, включая аэропорт, отель или квартиру. Доставка за пределы Батуми возможна за небольшую доплату.",
    "faq.q4":"Входит ли страховка в стоимость?","faq.a4":"Да. Каждая аренда включает полное КАСКО — вы защищены и на побережье, и в горах.",
    "faq.q5":"Какие способы оплаты вы принимаете?","faq.a5":"Мы принимаем USD, EUR, GEL и USDT — удобные варианты для путешественников со всего мира.",
    "faq.q6":"Как забронировать авто?","faq.a6":"Просто напишите нам в WhatsApp или Telegram, укажите даты и желаемое авто. Бронь подтверждается после согласования дат и внесения предоплаты.",
    "rev.kicker":"Отзывы","rev.h":"Что говорят гости",
    "rev.q":"“Спасибо за приятный сервис! Машина классная, весьма резвая и комплектация супер. Приятно, что чистая, без посторонних запахов. Отдельное спасибо за воду в салоне и скидку на заправку!”",
    "rev.by":"— Гость, арендовавший Subaru Forester",
    "about.badge":"С первого дня в Батуми","about.kicker":"О нас","about.h":"Ваш местный партнёр по аренде авто на побережье Грузии",
    "about.p":"Lucky Rental Car — сервис аренды в Батуми для тех, кто ценит свободу без мелкого шрифта. Мы знаем эти дороги — путь в Сарпи, подъём в горные деревни, поездку вдоль побережья в Кобулети — и готовим авто ко всему этому.",
    "about.l1":"Личная передача авто и подробный осмотр",
    "about.l2":"Гибкая подача и возврат по всему Батуми",
    "about.l3":"Прозрачные условия — водитель от 21 года, стаж от 2 лет",
    "about.l4":"Нам доверяют гости со всего региона",
    "about.cta":"Забронировать авто",
    "contact.kicker":"Связаться с нами","contact.h":"Бронируйте в одно сообщение","contact.p":"Выберите удобное приложение и напишите нам — обычно отвечаем за пару минут, 24/7.",
    "contact.fb":"Мы в Facebook",
    "info.loc":"Адрес","info.loc.v":"ул. Жиули Шартава 16<br />Батуми 6010, Грузия 🇬🇪",
    "info.hours":"Часы работы","info.hours.v":"Круглосуточно<br />7 дней в неделю",
    "info.terms":"Условия аренды","info.terms.v":"Водитель от 21 года<br />Стаж от 2 лет",
    "info.pay":"Оплата","info.pay.v":"USD · EUR · GEL · USDT<br />Без залога на карте",
    "map.directions":"Построить маршрут",
    "foot.about":"Премиум-аренда авто в Батуми, Грузия. Без залога · Полное КАСКО · Бесплатная доставка · Поддержка 24/7.",
    "foot.explore":"Разделы","foot.contact":"Контакты","foot.visit":"Адрес","foot.visit.v":"ул. Жиули Шартава 16<br />Батуми 6010, Грузия",
    "foot.made":"Сделано с ☘ на побережье Чёрного моря"
  }
};

/* ---- Contact URLs ---- */
const url = {
  wa:  `https://wa.me/${CONTACT.whatsapp}`,
  tg:  /^\d+$/.test(CONTACT.telegram) ? `https://t.me/+${CONTACT.telegram}` : `https://t.me/${CONTACT.telegram}`,
  ig:  `https://instagram.com/${CONTACT.instagram}`,
  fb:  `https://facebook.com/${CONTACT.facebook}`
};

/* ---- Language (URL ?lang=ru is crawlable & shareable) ---- */
const SITE_BASE = 'https://luckyrent.ge/';
const urlLang = new URLSearchParams(location.search).get('lang');
let LANG = urlLang || localStorage.getItem('lang') || (navigator.language||'en').slice(0,2).toLowerCase();
if(LANG!=='ru') LANG='en';

function t(key){ return (I18N[LANG] && I18N[LANG][key]) ?? (I18N.en[key] ?? key); }

/* Keep SEO tags in sync with the active language */
function syncSeoTags(){
  const selfUrl = LANG==='ru' ? SITE_BASE+'?lang=ru' : SITE_BASE;
  const set = (sel,attr,val)=>{ const el=document.querySelector(sel); if(el) el.setAttribute(attr,val); };
  document.title = t('meta.title');
  set('meta[name="description"]','content', t('meta.description'));
  set('#canonical','href', selfUrl);
  set('meta[property="og:url"]','content', selfUrl);
  set('meta[property="og:title"]','content', t('meta.title'));
  set('meta[property="og:description"]','content', t('meta.description'));
  set('meta[property="og:locale"]','content', LANG==='ru'?'ru_RU':'en_US');
  set('meta[property="og:locale:alternate"]','content', LANG==='ru'?'en_US':'ru_RU');
  set('meta[name="twitter:title"]','content', t('meta.title'));
  set('meta[name="twitter:description"]','content', t('meta.description'));
}

function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(I18N[LANG][k] !== undefined || I18N.en[k] !== undefined) el.innerHTML = t(k);
  });
  document.querySelectorAll('#lang .lang__btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===LANG));
  syncSeoTags();
  renderFleet();
}

function setLang(l){
  LANG = (l==='ru')?'ru':'en';
  localStorage.setItem('lang', LANG);
  /* reflect language in the URL without reloading (shareable + consistent with hreflang) */
  try{ const u=new URL(location.href); if(LANG==='ru') u.searchParams.set('lang','ru'); else u.searchParams.delete('lang'); history.replaceState(null,'',u); }catch(e){}
  applyLang();
}

/* ---- Booking link with prefilled message (includes selected day-tier + price) ---- */
function waBook(ci){
  const c=FLEET[ci], ti=carTier[ci], tier=DAY_TIERS[ti], price=c.prices[ti];
  const msg = LANG==='ru'
    ? `Здравствуйте, Lucky Rental Car! Хочу забронировать ${c.name} на ${tier.ru} — $${price}/сутки. Есть в наличии?`
    : `Hello Lucky Rental Car! I'd like to book the ${c.name} for ${tier.en} — $${price}/day. Is it available?`;
  return `${url.wa}?text=${encodeURIComponent(msg)}`;
}

/* ---- Wire generic contact links ---- */
function wireLinks(){
  document.querySelectorAll('[data-book]').forEach(a=>{
    a.href = `${url.wa}?text=${encodeURIComponent(
      LANG==='ru' ? "Здравствуйте, Lucky Rental Car! Хочу арендовать авто в Батуми."
                  : "Hello Lucky Rental Car! I'd like to rent a car in Batumi.")}`;
  });
  document.querySelectorAll('a[href]').forEach(a=>{
    const h = a.getAttribute('href');
    if(h.includes('wa.me') && !a.hasAttribute('data-book') && !a.dataset.wired) a.href = url.wa;
    else if(h.includes('t.me/')) a.href = url.tg;
    else if(h.includes('instagram.com/')) a.href = url.ig;
    else if(h.includes('facebook.com/')) a.href = url.fb;
  });
}

/* ---- Render fleet cards ---- */
function renderFleet(){
  const grid = document.getElementById('fleetGrid');
  if(!grid) return;
  grid.innerHTML = FLEET.map((c,ci)=>{
    const ti = carTier[ci], price = c.prices[ti];
    const alt = LANG==='ru' ? 'Аренда '+c.name+' в Батуми — Lucky Rental Car' : 'Rent '+c.name+' in Batumi — Lucky Rental Car';
    const tiers = DAY_TIERS.map((tr,k)=>
      `<button type="button" class="car__tier${k===ti?' is-active':''}" data-car="${ci}" data-tier="${k}" aria-pressed="${k===ti}">${tr[LANG]}</button>`).join('');
    return `
    <article class="car reveal in" data-car="${ci}">
      <button type="button" class="car__media" data-gallery="${ci}" aria-label="${LANG==='ru'?'Смотреть фото — '+c.name:'View photos — '+c.name}">
        <span class="car__class">${c.cls[LANG]}</span>
        <img src="${c.photos[0]}" alt="${alt}" width="1200" height="825" loading="lazy" decoding="async">
        <span class="car__count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9zm3 5.5A4.5 4.5 0 1 1 12 17a4.5 4.5 0 0 1 0-9zm0 2A2.5 2.5 0 1 0 12 15a2.5 2.5 0 0 0 0-5z"/></svg>${c.photos.length}</span>
      </button>
      <div class="car__body">
        <h3 class="car__name">${c.name}</h3>
        <p class="car__tag">${c.tag[LANG]}</p>
        <div class="car__specs">${c.specs[LANG].map(s=>`<span>${s}</span>`).join('')}</div>
        <div class="car__tierwrap">
          <span class="car__tierlabel">${t('fleet.rentalDays')}</span>
          <div class="car__tiers" role="group" aria-label="${t('fleet.rentalDays')}">${tiers}</div>
        </div>
        <div class="car__foot">
          <div class="car__price"><b class="car__amount">$${price}</b><span>${t('fleet.day')}</span></div>
          <div class="car__price car__price--from"><small>${t('fleet.from')}</small><b>$${Math.min(...c.prices)}</b><span>${t('fleet.day')}</span></div>
          <a class="btn btn--wa car__book" href="${waBook(ci)}" target="_blank" rel="noopener" data-wired="1">${t('fleet.book')}</a>
        </div>
      </div>
    </article>`;
  }).join('');
  wireLinks();
}

/* ---- Fleet day-tier selector → live price + booking link (delegated, set up once) ---- */
function initFleetInteractions(){
  const grid = document.getElementById('fleetGrid');
  if(!grid) return;
  grid.addEventListener('click', e=>{
    const media = e.target.closest('.car__media');
    if(media){ openLightbox(FLEET[+media.dataset.gallery].photos, 0); return; }
    const btn = e.target.closest('.car__tier'); if(!btn) return;
    const ci = +btn.dataset.car, ti = +btn.dataset.tier;
    carTier[ci] = ti;
    const card = btn.closest('.car');
    card.querySelectorAll('.car__tier').forEach(x=>{
      const on = x===btn; x.classList.toggle('is-active',on); x.setAttribute('aria-pressed',on);
    });
    const amt = card.querySelector('.car__amount');
    amt.textContent = '$'+FLEET[ci].prices[ti];
    amt.classList.remove('bump'); void amt.offsetWidth; amt.classList.add('bump');
    card.querySelector('.car__book').href = waBook(ci);
  });
}

/* ---- Sticky nav shadow ---- */
const nav = document.getElementById('nav');
addEventListener('scroll', ()=> nav.classList.toggle('scrolled', scrollY > 20));

/* ---- Language buttons ---- */
document.getElementById('lang').addEventListener('click', e=>{
  const b = e.target.closest('.lang__btn'); if(b) setLang(b.dataset.lang);
});

/* ---- Mobile menu ---- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=>{ burger.classList.toggle('open'); navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ burger.classList.remove('open'); navLinks.classList.remove('open'); }));

/* ---- Reveal on scroll ---- */
function observeReveals(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12, rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

/* ---- Lightbox ---- */
function initLightbox(){
  const box = document.getElementById('lightbox');
  const boxImg = document.getElementById('lightboxImg');
  const counter = box.querySelector('.lightbox__count');
  let list = [], idx = 0;
  const render = ()=>{ boxImg.src = list[idx]; if(counter) counter.textContent = `${idx+1} / ${list.length}`; };
  const show = i=>{ if(!list.length) return; idx=(i+list.length)%list.length; render(); };
  const open = ()=>{ box.classList.add('open'); box.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('no-scroll'); if(lenisInstance) lenisInstance.stop(); };
  const close = ()=>{ box.classList.remove('open'); box.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('no-scroll'); if(lenisInstance) lenisInstance.start(); };

  /* exposed to the whole module: open with any array of image srcs */
  openLightbox = (srcs, start=0)=>{ if(!srcs || !srcs.length) return; list = srcs.slice(); idx = start; render(); open(); };

  /* wire the gallery-grid thumbnails */
  const gimgs = [...document.querySelectorAll('#gallery-grid img')];
  const gsrcs = gimgs.map(im=>im.getAttribute('src'));
  gimgs.forEach((im,i)=>im.parentElement.addEventListener('click',()=>openLightbox(gsrcs,i)));

  box.querySelector('.lightbox__close').onclick = close;
  box.querySelector('.lightbox__next').onclick = e=>{ e.stopPropagation(); show(idx+1); };
  box.querySelector('.lightbox__prev').onclick = e=>{ e.stopPropagation(); show(idx-1); };
  box.addEventListener('click', e=>{ if(e.target===box) close(); });
  addEventListener('keydown', e=>{
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowRight') show(idx+1);
    else if(e.key==='ArrowLeft') show(idx-1);
  });

  /* touch swipe (mobile) */
  let sx=0, sy=0;
  box.addEventListener('touchstart', e=>{ const t=e.changedTouches[0]; sx=t.clientX; sy=t.clientY; }, {passive:true});
  box.addEventListener('touchend', e=>{
    const t=e.changedTouches[0], dx=t.clientX-sx, dy=t.clientY-sy;
    if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) show(idx + (dx<0?1:-1));
  }, {passive:true});
}

/* ---- Professional motion (GSAP + ScrollTrigger + Lenis) ---- */
function initMotion(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = window.gsap && window.ScrollTrigger;
  if(reduce || !hasGSAP){ observeReveals(); return; }   // graceful fallback

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  const ST = window.ScrollTrigger;
  document.documentElement.classList.add('has-gsap');

  /* Lenis momentum smooth-scroll, synced to GSAP */
  let lenis = null;
  if(window.Lenis){
    lenis = new window.Lenis({ duration:1.05, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true });
    lenisInstance = lenis;
    lenis.on('scroll', ST.update);
    gsap.ticker.add(t=> lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        if(id.length>1){ const el=document.querySelector(id); if(el){ e.preventDefault(); lenis.scrollTo(el,{offset:-72}); } }
      });
    });
  }

  /* Hero entrance */
  const heroEls = [...document.querySelectorAll('.hero .reveal')];
  gsap.set(heroEls,{opacity:0,y:28});
  gsap.to(heroEls,{opacity:1,y:0,duration:1,ease:'power3.out',stagger:.12,delay:.15});
  const heroImg = document.querySelector('.hero__bg img');
  if(heroImg) gsap.to(heroImg,{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  /* Scroll reveals — staggered, premium easing */
  const reveals = [...document.querySelectorAll('.reveal')].filter(el=>!el.closest('.hero'));
  gsap.set(reveals,{opacity:0,y:26});
  ST.batch(reveals,{ start:'top 88%',
    onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.9,ease:'power3.out',stagger:.08,overwrite:true}) });

  /* Failsafe: never leave in-view content hidden (e.g. a resumed background tab) */
  const revealInView = ()=>reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight*0.92 && parseFloat(getComputedStyle(el).opacity) < 1)
      gsap.to(el,{opacity:1,y:0,duration:.6,ease:'power2.out',overwrite:true});
  });
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ ST.refresh(); revealInView(); } });

  /* Stats count-up */
  document.querySelectorAll('.stat b').forEach(b=>{
    const m = b.textContent.trim().match(/^(\d+)(\D*)$/);
    if(!m) return;
    const end=+m[1], suf=m[2], o={v:0};
    ST.create({trigger:b, start:'top 92%', once:true, onEnter:()=>{
      gsap.to(o,{v:end,duration:1.4,ease:'power2.out',onUpdate:()=>{ b.textContent=Math.round(o.v)+suf; }});
    }});
  });

  /* Smart nav — hide on scroll down, reveal on scroll up */
  const navEl = document.getElementById('nav'); let last=0;
  const onScroll = y=>{
    navEl.classList.toggle('scrolled', y>20);
    navEl.classList.toggle('nav--hide', y>last && y>420);
    last=y;
  };
  if(lenis) lenis.on('scroll',({scroll})=>onScroll(scroll)); else addEventListener('scroll',()=>onScroll(scrollY));

  /* Magnetic buttons (fine pointers only) */
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.btn--gold, .hero__actions .btn').forEach(btn=>{
      btn.addEventListener('mousemove',e=>{
        const r=btn.getBoundingClientRect();
        gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.22, y:(e.clientY-r.top-r.height/2)*.3, duration:.4, ease:'power2.out'});
      });
      btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));
    });
  }

  ST.refresh();
}

/* ---- Init ---- */
document.getElementById('year').textContent = new Date().getFullYear();
applyLang();      // renders fleet + translates
wireLinks();
initFleetInteractions();  // day-tier price selector (delegated, survives re-render)
initLightbox();
initMotion();     // GSAP/Lenis when available & motion allowed; else static reveals
