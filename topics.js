(() => {
  'use strict';
  const DATA = {
  "regions": {
    "北部": ["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣"],
    "中部": ["苗栗縣","臺中市","彰化縣","南投縣","雲林縣"],
    "南部": ["嘉義市","嘉義縣","臺南市","高雄市","屏東縣"],
    "東部": ["宜蘭縣","花蓮縣","臺東縣"],
    "離島": ["澎湖縣","金門縣","連江縣"]
  },
  "attractions": {
    "臺北市": ["臺北101","國立故宮博物院","陽明山國家公園","象山親山步道","中正紀念堂","國父紀念館","西門町","龍山寺","大稻埕迪化街","士林官邸","士林夜市","饒河街觀光夜市","寶藏巖國際藝術村","華山1914文化創意產業園區","松山文創園區","臺北市立動物園","貓空纜車","北投溫泉博物館","地熱谷","關渡自然公園","美麗華百樂園","大湖公園","彩虹河濱公園","臺北植物園","袖珍博物館"],
    "新北市": ["九份老街","淡水老街","淡水漁人碼頭","野柳地質公園","十分瀑布","十分老街","平溪老街","菁桐老街","金瓜石黃金博物館","鼻頭角步道","龍洞灣岬步道","三峽老街","鶯歌陶瓷老街","烏來瀑布","烏來老街","碧潭風景區","坪林茶業博物館","石碇千島湖","深坑老街","十三行博物館","林本源園邸","十分寮天燈廣場","朱銘美術館","淡蘭古道","三貂角燈塔"],
    "基隆市": ["和平島地質公園","基隆廟口夜市","正濱漁港彩色屋","阿根納造船廠遺構","潮境公園","國立海洋科技博物館","八斗子車站","忘憂谷","望幽谷濱海步道","外木山濱海風景區","情人湖公園","大武崙砲台","白米甕砲台","基隆嶼","中正公園","基隆塔","紅淡山","獅球嶺砲台","佛手洞","仙洞巖","崁仔頂漁市","暖東峽谷","瑪陵坑溪","碧砂漁港","大坪海岸"],
    "桃園市": ["大溪老街","慈湖陵寢","石門水庫","拉拉山國家森林遊樂區","小烏來風景特定區","小烏來天空步道","桃園神社","虎頭山公園","永安漁港","竹圍漁港","草漯沙丘地質公園","角板山行館","三坑老街","龍潭大池","大溪花海農場","Xpark","華泰名品城","桃園市土地公文化館","羊稠森林步道","青塘園","埔心牧場","向陽農場","觀音蓮花園","新屋綠色走廊","文化路觀光夜市"],
    "新竹市": ["新竹都城隍廟","竹塹城迎曦門","新竹市立動物園","青青草原","十八尖山","香山濕地","南寮漁港","新竹漁港波光市集","新竹市玻璃工藝博物館","新竹市美術館","新竹公園","新竹州廳","東門市場","新竹市眷村博物館","金城新村","青青草原溜滑梯","青青草原湖","護城河親水公園","鐵道藝術村","新竹市消防博物館","黑蝙蝠中隊文物陳列館","香山車站","海山漁港","十七公里海岸線","青青草原風箏公園"],
    "新竹縣": ["內灣老街","北埔老街","峨眉湖","綠世界生態農場","六福村主題遊樂園","小叮噹科學主題樂園","尖石薰衣草森林","司馬庫斯","鎮西堡神木群","雪霸休閒農場","五峰清泉溫泉","觀霧國家森林遊樂區","竹東林業展示館","新月沙灣","鳳崎落日步道","新豐紅樹林","豆腐岩","合興車站","內灣吊橋","青蛙石天空步道","霞喀羅古道","新埔宗祠博物館","蓮華寺","北埔冷泉","飛鳳山"],
    "苗栗縣": ["勝興車站","龍騰斷橋","三義木雕博物館","苗栗客家文化園區","飛牛牧場","通霄神社","通霄海水浴場","後龍好望角","白沙屯拱天宮","南庄老街","蓬萊溪護魚步道","向天湖","神仙谷","泰安溫泉","大湖草莓文化館","卓蘭大峽谷","竹南龍鳳漁港","外埔漁港","苗栗火炎山","西湖渡假村","四方鮮乳牧場","雅聞七里香玫瑰森林","雪霸國家公園管理處汶水遊客中心","明德水庫","崎頂子母隧道"],
    "臺中市": ["高美濕地","彩虹眷村","逢甲夜市","一中街商圈","臺中國家歌劇院","國立自然科學博物館","國立臺灣美術館","東勢林場","大坑風景區","新社莊園古堡","新社花海","后豐鐵馬道","東豐自行車綠廊","麗寶樂園","谷關溫泉","武陵農場","福壽山農場","梨山風景區","霧峰林家宮保第園區","宮原眼科","審計新村","文化部文化資產園區","臺中公園","大甲鎮瀾宮","梧棲觀光漁港"],
    "彰化縣": ["鹿港老街","鹿港龍山寺","鹿港天后宮","八卦山大佛風景區","田尾公路花園","扇形車庫","王功漁港","芳苑濕地","玻璃媽祖廟","成美文化園","線西蛤蜊兵營","福寶濕地","溪湖糖廠","社頭清水岩寺","百果山探索樂園","彰化孔子廟","八卦山天空步道","南瑤宮","台灣優格餅乾學院","魔菇部落休閒農場","埔心牧場","田中森林公園","二林蔗農事件紀念館","芬園寶藏寺","田中窯創藝園區"],
    "南投縣": ["日月潭","九族文化村","清境農場","合歡山","溪頭自然教育園區","杉林溪森林生態渡假園區","奧萬大國家森林遊樂區","埔里酒廠","車埕木業展示館","集集車站","妖怪村","竹山紫南宮","中台禪寺","桃米生態村","紙教堂","地理中心碑","玄奘寺","慈恩塔","文武廟","向山遊客中心","九份二山","武界部落","東埔溫泉","竹山天梯","貓羅溪自行車道"],
    "雲林縣": ["北港朝天宮","西螺大橋","西螺老街","古坑綠色隧道","劍湖山世界","雲林布袋戲館","雲林故事館","北港老街","成龍濕地","椬梧滯洪池","湖山水庫","草嶺風景區","萬年峽谷","五年千歲公園","澄霖沉香味道森林館","興隆毛巾觀光工廠","雲林農業博覽會公園","雲林記憶COOL","斗六太平老街","虎尾合同廳舍","虎尾鐵橋","口湖遊客中心","馬蹄蛤主題館","持法媽祖宮","落羽松森林"],
    "嘉義市": ["檜意森活村","阿里山森林鐵路車庫園區","嘉義公園","嘉義市立美術館","嘉義市立博物館","蘭潭風景區","月影潭心","嘉義文化創意產業園區","嘉義舊監獄","森林之歌","北門驛","嘉義製材所","嘉義城隍廟","嘉義東市場","嘉義文化公園","射日塔","嘉義植物園","嘉義市史蹟資料館","玉山旅社咖啡","中央噴水池","嘉義鐵道藝術村","八掌溪堤防自行車道","嘉義市立交趾陶館","嘉義獄政博物館","嘉義幸福山丘"],
    "嘉義縣": ["阿里山國家森林遊樂區","奮起湖老街","逐鹿文創園區","太平雲梯","太平老街","瑞里風景區","隙頂二延平步道","觸口天長地久橋","觀音瀑布","布袋高跟鞋教堂","東石漁人碼頭","好美里3D彩繪村","鰲鼓濕地森林園區","故宮南院","新港奉天宮","板陶窯交趾剪黏工藝園區","北回歸線太陽館","梅山公園","仁義潭水庫","竹崎親水公園","大埔情人公園","曾文水庫","達娜伊谷自然生態公園","特富野古道","逐鹿山步道"],
    "臺南市": ["安平古堡","安平樹屋","赤崁樓","奇美博物館","四草綠色隧道","井仔腳瓦盤鹽田","七股鹽山","臺南孔廟","神農街","藍晒圖文創園區","林百貨","花園夜市","大東夜市","臺南美術館","司法博物館","十鼓仁糖文創園區","烏山頭水庫","關子嶺溫泉","玄空法寺","生命之樹","漁光島","黃金海岸","臺江國家公園","鹽水月津港","左鎮化石園區"],
    "高雄市": ["駁二藝術特區","愛河","西子灣","旗津老街","旗津海水浴場","蓮池潭","龍虎塔","佛光山佛陀紀念館","壽山動物園","打狗英國領事館文化園區","高雄市立美術館","衛武營國家藝術文化中心","六合觀光夜市","瑞豐夜市","夢時代購物中心","大港橋","高雄流行音樂中心","旗后燈塔","旗山老街","美濃民俗村","田寮月世界","茂林國家風景區","多納高吊橋","甲仙貓巷","崗山之眼"],
    "屏東縣": ["墾丁國家公園","鵝鑾鼻公園","鵝鑾鼻燈塔","龍磐公園","船帆石","白沙灣","後壁湖","南灣遊憩區","小琉球","東港華僑市場","大鵬灣國家風景區","鹿境梅花鹿生態園區","國立海洋生物博物館","萬金聖母聖殿","屏東菸葉廠","屏東縣民公園","勝利星村創意生活園區","林後四林平地森林園區","四重溪溫泉","車城福安宮","恆春古城","阿朗壹古道","旭海草原","墾草趣","三地門文化園區"],
    "宜蘭縣": ["幾米公園","羅東林業文化園區","羅東夜市","國立傳統藝術中心","蘭陽博物館","烏石港","龜山島","外澳沙灘","礁溪溫泉公園","五峰旗瀑布","清水地熱公園","太平山國家森林遊樂區","明池森林遊樂區","棲蘭森林遊樂區","張美阿嬤農場","冬山河親水公園","梅花湖","三星蔥仔寮體驗農場","蘇澳冷泉","南方澳觀景台","豆腐岬","東澳粉鳥林","南澳農場","福山植物園","林美石磐步道"],
    "花蓮縣": ["七星潭","太魯閣國家公園","清水斷崖","鯉魚潭","雲山水","慕谷慕魚","東大門夜市","松園別館","花蓮文化創意產業園區","將軍府1936","吉安慶修院","新城天主堂","石梯坪","芭崎瞭望台","牛山呼庭","豐濱天空步道","六十石山","赤柯山","瑞穗牧場","北回歸線標誌公園","林田山林業文化園區","馬太鞍濕地","大石鼻山步道","石門洞","遠雄海洋公園"],
    "臺東縣": ["三仙台","伯朗大道","池上天堂路","鹿野高台","多良車站","太麻里金針山","知本溫泉","小野柳","富岡地質公園","加路蘭遊憩區","國立臺灣史前文化博物館","臺東森林公園","鐵花村音樂聚落","臺東觀光夜市","初鹿牧場","關山親水公園","富山護漁區","都蘭糖廠","水往上流","金樽遊憩區","綠島","蘭嶼","朝日溫泉","伽路蘭海岸","知本森林遊樂區"],
    "澎湖縣": ["澎湖跨海大橋","通樑古榕","二崁聚落","大菓葉玄武岩","小門地質館","鯨魚洞","池西岩瀑","池東大菓葉","內垵遊憩區","西嶼燈塔","風櫃洞","山水沙灘","隘門沙灘","林投公園","奎壁山摩西分海","南寮古厝","澎湖生活博物館","篤行十村","天后宮","觀音亭","中央老街","蛇頭山","虎井嶼","桶盤嶼","七美雙心石滬"],
    "金門縣": ["莒光樓","翟山坑道","古寧頭戰史館","水頭聚落","得月樓","金門酒廠","建功嶼","金城老街","模範街","清金門鎮總兵署","金門民俗文化村","馬山觀測所","獅山砲陣地","山后聚落","陳景蘭洋樓","金門植物園","慈湖","太湖","金門大學周邊","古崗湖","乳山遊客中心","金門和平紀念園區","歐厝沙灘","后湖海濱公園","小金門（烈嶼）九宮坑道"],
    "連江縣": ["北海坑道","芹壁聚落","大漢據點","鐵堡","馬祖酒廠","八八坑道","枕戈待旦紀念公園","馬港天后宮","媽祖巨神像","津沙聚落","勝天公園","雲台山","福正聚落","大埔聚落","東莒燈塔","猛澳港","仁愛沙灘","24據點","魚路古道","藍眼淚生態館","馬祖民俗文物館","坂里沙灘","塘后道沙灘","枋寮澳口","螺山自然步道"]
  },
  "foods": [
    {"name":"牛肉麵","image":"images/foods/01-beef-noodles.jpg","shops":["林東芳牛肉麵｜臺北市中山區八德路二段322號","老山東牛肉家常麵店｜臺北市萬華區西寧南路70號B1"]},
    {"name":"小籠包","image":"images/foods/02-xiaolongbao.jpg","shops":["鼎泰豐（信義店）｜臺北市大安區信義路二段194號","杭州小籠湯包｜臺北市大安區杭州南路二段17號"]},
    {"name":"滷肉飯","image":"images/foods/03-braised-pork-rice.jpg","shops":["金峰魯肉飯｜臺北市中正區羅斯福路一段10號","天天利美食坊｜臺北市萬華區漢中街32巷1號"]},
    {"name":"蚵仔煎","image":"images/foods/04-oyster-omelet.jpg","shops":["圓環邊蚵仔煎｜臺北市大同區寧夏路46號","寧夏夜市｜臺北市大同區寧夏路一帶"]},
    {"name":"蔥抓餅","image":"images/foods/05-scallion-pancake.jpg","shops":["天津蔥抓餅｜臺北市大安區永康街6巷1號","師園鹽酥雞｜臺北市大安區師大路39巷14號"]},
    {"name":"臭豆腐","image":"images/foods/06-stinky-tofu.jpg","shops":["王記府城肉粽｜臺北市大同區南京西路185巷20號","深坑老街｜新北市深坑區深坑街"]},
    {"name":"珍珠奶茶","image":"images/foods/07-bubble-tea.jpg","shops":["春水堂（臺北信義店）｜臺北市信義區松壽路9號","五十嵐｜臺北市多處分店"]},
    {"name":"雞排","image":"images/foods/08-fried-chicken.jpg","shops":["豪大大雞排（士林夜市）｜臺北市士林區基河路一帶","師園鹽酥雞｜臺北市大安區師大路39巷14號"]},
    {"name":"芒果冰","image":"images/foods/09-mango-ice.jpg","shops":["Smoothie House 思慕昔（永康店）｜臺北市大安區永康街15號","冰讚｜臺北市大同區雙連街2號"]},
    {"name":"胡椒餅","image":"images/foods/10-pepper-bun.jpg","shops":["福州世祖胡椒餅（饒河店）｜臺北市松山區饒河街249號","福元胡椒餅｜臺北市大同區華陰街42-19號"]},
    {"name":"芋圓","image":"images/foods/11-taro-balls.jpg","shops":["阿柑姨芋圓｜新北市瑞芳區豎崎路5號","九份老街｜新北市瑞芳區基山街一帶"]},
    {"name":"鳳梨酥","image":"images/foods/12-pineapple-cake.jpg","shops":["佳德糕餅｜臺北市松山區南京東路五段88號","微熱山丘（臺北民生公園店）｜臺北市松山區民生東路五段36巷4弄1號"]}
  ],
  "taipeiAttractions": [
    {"name":"臺北101","address":"臺北市信義區信義路五段7號","description":"臺灣最具代表性的地標，觀景臺可鳥瞰全臺北，周邊精品百貨環繞。","image":"images/attractions/01-taipei-101.jpg"},
    {"name":"國父紀念館","address":"臺北市信義區仁愛路四段505號","description":"擁有開闊的廣場，是遠眺與拍攝101的絕佳角度，衛兵交接極具特色。","image":"images/attractions/02-sun-yat-sen-memorial.jpg"},
    {"name":"中正紀念堂","address":"臺北市中正區中山南路21號","description":"宏偉的藍白建築與自由廣場，平日適合散步，也是大型藝文市集常駐地。","image":"images/attractions/03-chiang-kai-shek-memorial.jpg"},
    {"name":"西門町","address":"臺北市萬華區成都路、漢中街一帶","description":"青少年潮流、街頭藝人與流行文化的發源地，必拍彩虹馬路與西門紅樓。","image":"images/attractions/04-ximending.jpg"},
    {"name":"大稻埕碼頭","address":"臺北市大同區民生西路底（淡水河畔）","description":"傍晚黃昏的夕陽非常美麗，貨櫃市集提供異國美食與微醺調酒。","image":"images/attractions/05-dadaocheng-wharf.jpg"},
    {"name":"松山文創園區","address":"臺北市信義區光復南路133號","description":"舊菸廠改建的松菸，融合古蹟建築與誠品行旅，常有設計大展。","image":"images/attractions/06-songshan-cultural-park.jpg"},
    {"name":"華山1914文創園區","address":"臺北市中正區八德路一段1號","description":"紅磚牆與綠藤蔓交織，充滿獨立咖啡廳、文創小店與展演空間。","image":"images/attractions/07-huashan-1914.jpg"},
    {"name":"迪化街","address":"臺北市大同區迪化街一段","description":"保存完美的百年巴洛克老建築，近年翻轉進駐許多中藥文創店與文青茶館。","image":"images/attractions/08-dihua-street.jpg"},
    {"name":"剝皮寮歷史街區","address":"臺北市萬華區廣州街101號","description":"位於萬華，重現清代與日治時期的紅磚街道，為電影《艋舺》取景地。","image":"images/attractions/09-bopiliao.jpg"},
    {"name":"榕錦時光生活園區","address":"臺北市中正區金華街3號","description":"日式老宿舍群變身的小京都，有精緻餐飲、和服體驗與質感小店。","image":"images/attractions/10-rongjin.jpg"},
    {"name":"赤峰街","address":"臺北市大同區赤峰街一帶","description":"捷運中山站旁的打鐵老街，現已變成獨立服飾店與文青甜點的天堂。","image":"images/attractions/11-chifeng-street.jpg"},
    {"name":"陽明山國家公園","address":"臺北市北投區竹子湖路1-20號（遊客中心）","description":"臺北的後花園，一年四季都有不同風景，如小油坑的火山地質奇景。","image":"images/attractions/12-yangmingshan.jpg"},
    {"name":"擎天崗草原","address":"臺北市士林區菁山路101巷246號","description":"一望無際的翠綠大草原，經常能看到野放的水牛群，非常適合野餐。","image":"images/attractions/13-qingtiangang.jpg"},
    {"name":"象山步道","address":"臺北市信義區信義路五段150巷22弄","description":"只需步行20分鐘即可登頂，是拍攝101全景與都市日落的最佳觀景臺。","image":"images/attractions/14-elephant-mountain.jpg"},
    {"name":"大安森林公園","address":"臺北市大安區新生南路二段1號","description":"臺北市中心的都市之肺，擁有大片草皮、生態池及豐富的鳥類生態。","image":"images/attractions/15-daan-forest-park.jpg"},
    {"name":"北投地熱谷","address":"臺北市北投區中山路30號","description":"溫泉源頭之一，終年瀰漫著如仙境般的青磺泉白煙與硫磺味。","image":"images/attractions/16-beitou-thermal-valley.jpg"},
    {"name":"貓空","address":"臺北市文山區指南路三段38巷（纜車貓空站）","description":"搭乘透明的水晶纜車上山，一邊品嚐在地鐵觀音茶，一邊遠眺臺北盆地。","image":"images/attractions/17-maokong.jpg"},
    {"name":"國立故宮博物院","address":"臺北市士林區至善路二段221號","description":"享譽國際的文化寶庫，收藏數千年華夏歷史珍寶，如翠玉白菜。","image":"images/attractions/18-national-palace-museum.jpg"},
    {"name":"臺北市立美術館","address":"臺北市中山區中山北路三段181號","description":"位於圓山，純白現代的幾何建築，是當代藝術愛好者的必訪之地。","image":"images/attractions/19-taipei-fine-arts-museum.jpg"},
    {"name":"臺北植物園","address":"臺北市中正區南海路53號","description":"歷史悠久的植物園，內有古色古香的欽差行臺與荷花池。","image":"images/attractions/20-taipei-botanical-garden.jpg"},
    {"name":"國家兩廳院","address":"臺北市中正區中山南路21-1號","description":"宮殿式的雄偉建築，是臺灣藝文表演的最高殿堂。","image":"images/attractions/21-national-theater.jpg"},
    {"name":"臺北市立動物園","address":"臺北市文山區新光路二段30號","description":"全臺規模最大的動物園，大貓熊、企鵝與非洲動物區深受小朋友喜愛。","image":"images/attractions/22-taipei-zoo.jpg"},
    {"name":"兒童新樂園","address":"臺北市士林區承德路五段55號","description":"臺北專屬的兒童主題樂園，旋轉木馬、摩天輪等遊樂設施價格非常親民。","image":"images/attractions/23-childrens-amusement-park.jpg"},
    {"name":"士林夜市","address":"臺北市士林區基河路101號周邊","description":"臺北規模最大夜市，傳統小吃與逛街店家極多，國際旅客必訪。","image":"images/attractions/24-shilin-night-market.jpg"},
    {"name":"寧夏夜市","address":"臺北市大同區寧夏路58號周邊","description":"以在地傳統臺灣小吃「純密度最高」著稱，千歲宴與蛋黃芋餅非常有名。","image":"images/attractions/25-ningxia-night-market.jpg"}
  ]
};
  const regions = DATA.regions;
  const allCities = Object.values(regions).flat();
  const foods = DATA.foods;
  const credits = window.TOPIC_IMAGE_CREDITS || {};
  const regionOptions = document.querySelector('#regionOptions');
  const citySelect = document.querySelector('#citySelect');
  const filterHint = document.querySelector('#filterHint');
  const foodSection = document.querySelector('#food-guide');
  const attractionSection = document.querySelector('#attraction-guide');
  const foodGrid = document.querySelector('#foodGrid');
  const attractionGrid = document.querySelector('#attractionGrid');
  const foodTitle = document.querySelector('#foodTitle');
  const attractionTitle = document.querySelector('#attractionTitle');
  let selectedRegion = '';
  let selectedCity = '';
  let imageRequestToken = 0;

  function addImageCredit(container, group, index) {
    const credit = credits[group]?.[index];
    if (!credit) return;
    const link = document.createElement('a');
    link.className = 'image-credit';
    link.href = credit.sourceUrl;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = credit.creditText || `圖片：${credit.author} · ${credit.license}`;
    link.setAttribute('aria-label', credit.ariaLabel || `圖片來源：${credit.author}，${credit.license}，開啟維基共享資源`);
    container.appendChild(link);
  }

  function normalizeCityName(name) {
    return String(name || '').replace(/台/g, '臺').trim();
  }

  function mapsSearch(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function renderRegions() {
    regionOptions.innerHTML = '';
    Object.keys(regions).forEach(region => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'region-btn' + (selectedRegion === region ? ' active' : '');
      button.textContent = region;
      button.setAttribute('aria-pressed', String(selectedRegion === region));
      button.addEventListener('click', () => {
        selectedRegion = region;
        selectedCity = '';
        renderRegions();
        renderCityOptions();
        hideContent();
        filterHint.textContent = `已選擇${region}，請再選擇縣市。`;
      });
      regionOptions.appendChild(button);
    });
  }

  function renderCityOptions() {
    citySelect.innerHTML = '<option value="">請選擇縣市</option>';
    citySelect.disabled = !selectedRegion;
    (selectedRegion ? regions[selectedRegion] : []).forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.value = '';
  }

  function hideContent() {
    foodSection.hidden = true;
    attractionSection.hidden = true;
    foodGrid.innerHTML = '';
    attractionGrid.innerHTML = '';
  }

  function createFoodCard(food, index, city) {
    const article = document.createElement('article');
    article.className = 'food-card';
    const button = document.createElement('button');
    button.className = 'food-flip';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', `${food.name}，點擊查看${city}推薦店家搜尋`);
    const inner = document.createElement('span');
    inner.className = 'food-flip-inner';
    const front = document.createElement('span');
    front.className = 'food-face food-front';
    const image = document.createElement('img');
    image.src = credits.foods?.[index]?.file || food.image;
    image.alt = '';
    image.loading = 'lazy';
    if (normalizeCityName(city) !== '臺北市') {
      loadCommonsImage(image, `${food.name} ${city} Taiwan food`, imageRequestToken);
    }
    const name = document.createElement('span');
    name.className = 'food-name';
    name.textContent = food.name;
    front.append(image, name);

    const back = document.createElement('span');
    back.className = 'food-face food-back';
    const number = document.createElement('span');
    number.className = 'food-back-number';
    number.textContent = `NO. ${String(index + 1).padStart(2, '0')}`;
    const backTitle = document.createElement('span');
    backTitle.className = 'food-back-title';
    backTitle.textContent = `${food.name}｜${city}推薦`;
    const shopList = document.createElement('span');
    shopList.className = 'food-shops';

    if (normalizeCityName(city) === '臺北市') {
      food.shops.forEach(shop => {
        const item = document.createElement('span');
        item.className = 'food-shop';
        item.textContent = shop;
        shopList.appendChild(item);
      });
    } else {
      const item = document.createElement('span');
      item.className = 'food-shop';
      const link = document.createElement('a');
      link.href = mapsSearch(`${city} ${food.name} 推薦店家`);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `在 Google 地圖搜尋「${city} ${food.name}」`;
      const note = document.createElement('small');
      note.textContent = '開啟地圖查看該縣市店家、地址與最新營業資訊';
      item.append(link, note);
      shopList.appendChild(item);
    }

    back.append(number, backTitle, shopList);
    addImageCredit(back, 'foods', index);
    inner.append(front, back);
    button.appendChild(inner);
    button.addEventListener('click', () => {
      const flipped = button.classList.toggle('is-flipped');
      button.setAttribute('aria-pressed', String(flipped));
    });
    article.appendChild(button);
    return article;
  }

  function getAttractions(city) {
    const originalTaipei = normalizeCityName(city) === '臺北市'
      ? DATA.taipeiAttractions
      : [];
    const originalByName = new Map(originalTaipei.map(place => [place.name, place]));
    return DATA.attractions[city].map(name => {
      const original = originalByName.get(name);
      return {
        name,
        address: original?.address || `${city}（點擊查看 Google 地圖位置）`,
        description: original?.description || `${name}是${city}景點清單中的推薦地點，可開啟地圖查看位置、交通方式與最新資訊。`,
        image: original?.image || ''
      };
    });
  }

  function loadCommonsImage(img, query, token) {
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=900&format=json&origin=*`;
    fetch(endpoint).then(response => {
      if (!response.ok) throw new Error('image search failed');
      return response.json();
    }).then(data => {
      if (token !== imageRequestToken) return;
      const pages = data.query?.pages ? Object.values(data.query.pages) : [];
      const url = pages[0]?.imageinfo?.[0]?.thumburl || pages[0]?.imageinfo?.[0]?.url;
      if (url) img.src = url;
      else img.classList.add('image-unavailable');
    }).catch(() => {
      if (token === imageRequestToken) img.classList.add('image-unavailable');
    });
  }
    function createAttractionCard(place, index, city, token) {
    const article = document.createElement('article');
    article.className = 'attraction-card is-collapsed';
    const stamp = document.createElement('button');
    stamp.className = 'attraction-stamp';
    stamp.type = 'button';
    stamp.setAttribute('aria-expanded', 'false');
    stamp.setAttribute('aria-label', `展開${place.name}的景點介紹`);

    const figure = document.createElement('figure');
    figure.className = 'attraction-photo';
    const image = document.createElement('img');
    image.alt = `${place.name}景點照片`;
    image.loading = 'lazy';
    if (place.image) image.src = place.image;
    else {
      image.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#ead8bd"/><text x="50%" y="48%" text-anchor="middle" font-size="34" fill="#80634e">${place.name.replace(/[<>&]/g, '')}</text><text x="50%" y="58%" text-anchor="middle" font-size="20" fill="#80634e">PickMe 景點</text></svg>`
      );
      loadCommonsImage(image, `${place.name} ${city}`, token);
    }
    figure.appendChild(image);
    stamp.append(figure);

    const number = document.createElement('span');
    number.className = 'attraction-number';
    number.textContent = String(index + 1).padStart(2, '0');
    stamp.appendChild(number);

    const pullout = document.createElement('div');
    pullout.className = 'attraction-pullout';
    const details = document.createElement('div');
    details.className = 'attraction-details';
    details.id = `attraction-details-${index + 1}`;
    const title = document.createElement('h3');
    title.textContent = place.name;
    const address = document.createElement('p');
    address.className = 'attraction-address';
    const mapLink = document.createElement('a');
    mapLink.href = mapsSearch(`${city} ${place.name}`);
    mapLink.target = '_blank';
    mapLink.rel = 'noopener noreferrer';
    mapLink.textContent = place.address;
    address.appendChild(mapLink);
    const description = document.createElement('p');
    description.className = 'attraction-description';
    description.textContent = place.description;
    details.append(title, address, description);
    if (normalizeCityName(city) === '臺北市') addImageCredit(details, 'attractions', index);
    pullout.append(details);
    stamp.setAttribute('aria-controls', details.id);
    article.append(stamp, pullout);

    stamp.addEventListener('click', () => {
      const expanded = article.classList.toggle('is-expanded');
      article.classList.toggle('is-collapsed', !expanded);
      stamp.setAttribute('aria-expanded', String(expanded));
      stamp.setAttribute('aria-label', `${expanded ? '收合' : '展開'}${place.name}的景點介紹`);
    });
    article.addEventListener('pointerenter', () => {
      if (!article.classList.contains('is-collapsed')) stamp.setAttribute('aria-expanded', 'true');
    });
    article.addEventListener('pointerleave', () => {
      if (!article.classList.contains('is-expanded') && !article.contains(document.activeElement)) {
        stamp.setAttribute('aria-expanded', 'false');
      }
    });
    article.addEventListener('focusin', () => {
      if (!article.classList.contains('is-collapsed')) stamp.setAttribute('aria-expanded', 'true');
    });
    article.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!article.classList.contains('is-expanded') && !article.matches(':hover') && !article.contains(document.activeElement)) {
          stamp.setAttribute('aria-expanded', 'false');
        }
      });
    });
    return article;
  }

  function renderCity(city) {
    imageRequestToken++;
    const token = imageRequestToken;
    selectedCity = city;
    foodTitle.textContent = `${city}在地美食`;
    attractionTitle.textContent = `${city}特色景點`;
    foodGrid.innerHTML = '';
    attractionGrid.innerHTML = '';
    foods.forEach((food, index) => foodGrid.appendChild(createFoodCard(food, index, city)));
    getAttractions(city).forEach((place, index) => {
      attractionGrid.appendChild(createAttractionCard(place, index, city, token));
    });
    foodSection.hidden = false;
    attractionSection.hidden = false;
    filterHint.textContent = `${selectedRegion}・${city}｜12 種美食品項・25 個景點`;
  }

  citySelect.addEventListener('change', () => {
    if (!citySelect.value) {
      selectedCity = '';
      hideContent();
      return;
    }
    renderCity(citySelect.value);
  });

  renderRegions();
  renderCityOptions();
  hideContent();

  const topButton = document.querySelector('#topicsTop');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const updateTopButton = () => {
    const visible = window.scrollY > 420;
    topButton.classList.toggle('is-visible', visible);
    topButton.setAttribute('aria-hidden', String(!visible));
    topButton.tabIndex = visible ? 0 : -1;
  };
  topButton.addEventListener('click', () => {
    if (topButton.classList.contains('is-launching')) return;
    topButton.classList.add('is-launching');
    window.setTimeout(() => {
      topButton.classList.remove('is-launching');
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }, reduceMotion ? 0 : 700);
  });
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();

  const pupils = topButton.querySelectorAll('.top-ghost-pupil');
  document.addEventListener('pointermove', event => {
    const bounds = topButton.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width * 0.42)));
    const y = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height * 0.43)) / (bounds.height * 0.3)));
    pupils.forEach(pupil => {
      pupil.style.left = `${28.7 + x * 25}%`;
      pupil.style.top = `${29.7 + y * 24}%`;
    });
  }, { passive: true });

  const blinkTopGhost = () => {
    if (topButton.classList.contains('is-visible')) {
      topButton.classList.add('is-blinking');
      window.setTimeout(() => topButton.classList.remove('is-blinking'), 140);
    }
    window.setTimeout(blinkTopGhost, 1800 + Math.random() * 3200);
  };
  window.setTimeout(blinkTopGhost, 1200 + Math.random() * 1800);
})();