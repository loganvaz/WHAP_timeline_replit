
/*
need to add = {
  color coding based on theme(s) - done
  borders - done
  allow multiple topics
  allow multiple regions (ex. Columbian exchange)
}
*/
bIGENTRIES = {};

//line 339 is where to define dictionary
//add lines @ 346

//future = custom time and 
//future = empires life on top

// need to make sure topic doubling up working and add region double up 
periodDictionary = {};
periodDictionary[0] = [1200, 1450];
periodDictionary[1] = [1450, 1750];
periodDictionary[2] = [1750, 1900];
periodDictionary[3] = [1900, 2020];
//line 192 is border width size

//SO ITs borderline cases (start and endtime that are fielding errors)


//adding/removing based on what is selected
function periodBasedTimeLine(entries0) {
  let periodSelect = document.getElementsByName("Period");
   // console.log(periodSelect);
  //  console.log("above is period select");
    var whichSelected = periodSelect[0].value;
    for (let i = 0; i<periodSelect.length; i++) {
      if (periodSelect[i].checked==true) {
        whichSelected = periodSelect[i].value;
        //console.log("true");
      }
    }
   console.log(whichSelected);//CONTINUE FROM HERE
  let index = whichSelected -1;
  const startTime = periodDictionary[index][0];
  const endTime = periodDictionary[index][1];
  console.log(startTime);
  console.log(endTime);

  let entries = {};
   for (var key in entries0) {
     if (key <=endTime && key>=startTime) {
       entries[key] = entries0[key];
     //  console.log("found");
       
       }

   }//so, I now have the right parts of entries selected

///pasting code
  
  let time1 = startTime;
  let time2 = endTime;
  $("#lineOfTimeLine").empty();
  position_delta = document.getElementById("lineOfTimeLine").clientWidth/5;
  console.log(position_delta);
  time_step = (time2-time1)/4;
  for (var i = 0; i<5; i++) {
    var d = document.createTextNode(""+parseInt((time1+time_step*i+.5)));
    var c= document.createElement("span");
    c.style.backgroundColor = "white";
    c.style.borderWidth = ".05em";
    c.className = "timeNote";
    c.appendChild(d);
   
    // ""+position_delta*i+"em";
    document.getElementById("lineOfTimeLine").append(c);
     c.style.left = i*25+"%";



  }
//in actuality will be passed a list of lists based on period and will = list of periods[list of segments, each entry is {}]
//get required dict and then (they will be chronologically) will get dictionary per
//each time set and append as such 

  var gottenWidth = 93;//need to actually get this seperately
 
  var segments = 8; //really segments = entries[period].lengthh
  for (var i = 0; i<segments; i++) {
    var di = document.createElement("div");
    di.classList.add("timeBox");
    di.id = "timeBox" + i;

    di.style.borderWidth = ".5em";
    di.style.borderColor = "black";
   // var c = document.createTextNode("hi");
  //  di.appendChild(c);
  //  di.innerHTML = "hi there";
    $(di).css('width', 100.0/segments+"%");
    di.style.backgroundColor = "yellow";
    document.getElementById("timeline").append(di);
        di.width = 100.0/segments+"%";
   // console.log(di.width);
    di.height = "100%";
    di.style.left = i*100/segments+"%";
  }


  //end of paste


  makeTimeLine(time1, time2, entries, segments);
  //for (key in entries0) {
  //  console.log(key);
  //}
}


function makeTimeLine(time1, time2, entries0, segments) {
    console.log("REMAKING TIMELINE");
    $(".info").remove();
    var hold = document.getElementsByName("themes");
   /* let periodSelect = document.getElementsByName("Period");
    console.log(periodSelect);
    console.log("above is period select");
    var whichSelected = periodSelect[0].value;
    for (let i = 0; i<periodSelect.length; i++) {
      if (periodSelect[i].checked==true) {
        whichSelected = periodSelect[i].value;
        //console.log("true");
      }
    }
   console.log(whichSelected);//CONTINUE FROM HERE*/

    //console.log('hi');
    //console.log(hold[1].value);
    var checkThemes = [];
    for (var i = 0; i<hold.length; i++) {
     // console.log("here");
      if (hold[i].checked == true) {
        checkThemes.push(hold[i].value);
      }
      
    }

  //  console.log(checkThemes);//contains all valid themes

   // console.log(checkThemes);
    let entries1 = {};
  //  console.log("below is entries0");
  //  console.log(entries0);
    for (var key in entries0) {
      var match = 0;
      var matchIndex = 0; 
      for (var i = 0; i<entries0[key][1].length; i++) {//was key[1].length
   //     console.log(entries0[key][1][i]);
        if (checkThemes.includes(entries0[key][1][i])) {
        //  console.log("hit for " + key);
        //  console.log(checkThemes);
        //  console.log(entries0[key][1][i]);
          match= match + 1;
          matchIndex = i;
        }
      }
      if (match !=0) {
        entries1[key] = entries0[key];
        let listed = [];
        listed.push(entries0[key][1][matchIndex]);
   //     console.log("below is listed");
     //   console.log(listed);
     //   console.log("end");
       // entries1[key][1] = listed;
      }

    }
    let entries = {};
 //   console.log("below is entries1");
 ///   console.log(entries1);
    hold = document.getElementsByName("regions");

    //console.log('hi');
  //  console.log(hold[1].value);
    var checkRegion = [];
    for (var i = 0; i<hold.length; i++) {
     // console.log("here");
      if (hold[i].checked == true) {
        checkRegion.push(hold[i].value);
      }
      
    }
    //console.log("region");
    //console.log(checkRegion);


    for (var key in entries1) {
      var match = 0;
     // for (var i = 0; i<key[1].length; i++) {
       // console.log(entries0[key][1][i]);
       for (let i = 0; i<entries1[key][0].length; i++) {
        if (checkRegion.includes(entries1[key][0][i])) {
        //  console.log("hit for " + key);
      //    console.log(checkRegion);
         // console.log(entries1[key][0]);
          match= match + 1;}
       // }
      }
      if (match !=0) {
        entries[key] = entries1[key];
      }
    }

    let keys = Object.keys(entries);
    keys.sort();
   // console.log(keys);
    console.log("here");
    for (let ii = 0; ii<keys.length; ii++) {
         key = keys[ii];
      //console.log(key);


    var timeNow = parseInt(key);
    var listofStuff = entries[key];
    var d = document.createElement("div");
    d.style.borderWidth = ".25em";//was .5 em 
    var classAd = listofStuff[1];
    for (var i = 0; i<classAd.length; i++){
   //if (checkThemes.includes(entries0[key][1][i])) {
     if (checkThemes.includes(entries[key][1][i])) {
       d.classList.add(classAd[i]);}
    }
    //in the future should partition timeline into say 10 groups and then sort underneath by time
    var c = document.createElement("span");
    c.classList.add("info");
    c.innerHTML = ("<b>"+Math.round(key)+" ("+entries[key][0]+ "): " +entries[key][2]+"</b><br>"+entries[key][3]);
    d.appendChild(c);

    //trying this
     d.classList.add("info");





    //end of try
    var which = 3;//i think this is baseline to put on timeline
    var timeD = time1+ (time2-time1)/segments;//had small - and no = below
    while (timeD<=timeNow) {
      which++;
      timeD = timeD+ (time2-time1)/segments;
    }
  //  console.log(which);
  //  console.log(document.getElementById("timeline").childNodes)
    //console.log("which below");
  //  console.log(which);
    while (which>segments+2) {//using 3 b/c base of which
       which = which-1;
    }
 //   console.log(which);
  //  console.log("logging which");
    //need to do timeline.childElements
    document.getElementById("timeline").childNodes[which].append(d);
    d.style.backgroundColor = "white";
    }
}



$(document).ready(function() {

  


  var selection = document.getElementById("themes");
  //console.log("hi");
  //var selections = selection.childNodes;
  for (var i = 0; i<selection.childElementCount-1; i++) {
    selection.children[i].checked = true;
  }

  var selection2 = document.getElementById("regions");
  var regions = ["Americas", "Europe", "Africa", "Asia", "Oceania"];
  for (var i = 0; i<regions.length; i++) {
    var c = document.createElement('input');
    c.type = "checkbox";
    c.name ="regions";
    c.value = regions[i];
    c.id = regions[i];
    c.checked = true;
    var label = document.createElement("label");
    label.htmlFor = regions[i];
    label.appendChild(document.createTextNode(regions[i]));
    selection2.append(c);
    selection2.append(label);
    selection2.append(document.createElement("BR"));

  }

  selection3 = document.getElementById("periods");
  
var periods = [1,2,3,4];
  for (var i = 0; i<periods.length; i++) {
    var c = document.createElement('input');
    c.type = "radio";
    c.name ="Period";
    c.value = periods[i];
    c.id = periods[i];
    var label = document.createElement("label");
    label.htmlFor = periods[i];
    label.appendChild(document.createTextNode("Period_" + periods[i]));
    selection3.append(c);
    selection3.append(label);
    selection3.append(document.createElement("BR"));

  }
document.getElementById(1).checked = true;
  restart("150em",true);





})
  function restart(theSize, adding) {

  //need to add time elemnt correlated w/ periods
  
  
  //so basically I need to reimplement this process in my code
  $("#lineOfTimeLine").css("width",theSize);
  $("#timeline").css("width",theSize);
  time1 = 1450;
  time2 = 1750;
  position_delta = document.getElementById("lineOfTimeLine").clientWidth/5;
  console.log(position_delta);
  time_step = (time2-time1)/4;
  for (var i = 0; i<5; i++) {
    var d = document.createTextNode(""+(time1+time_step*i));
    var c= document.createElement("span");
    c.style.backgroundColor = "white";
    c.style.borderWidth = ".05em";
    c.className = "timeNote";
    c.appendChild(d);
   
    // ""+position_delta*i+"em";
    document.getElementById("lineOfTimeLine").append(c);
     c.style.left = i*25+"%";



  }
//in actuality will be passed a list of lists based on period and will = list of periods[list of segments, each entry is {}]
//get required dict and then (they will be chronologically) will get dictionary per
//each time set and append as such 

  //var gottenWidth = 93;//need to actually get this seperately
//  var entries = {};
  var segments = 8; //really segments = entries[period].lengthh
  for (var i = 0; i<segments; i++) {
    var di = document.createElement("div");
    di.classList.add("timeBox");
    di.id = "timeBox" + i;

    di.style.borderWidth = ".5em";
    di.style.borderColor = "black";
   // var c = document.createTextNode("hi");
  //  di.appendChild(c);
  //  di.innerHTML = "hi there";
    $(di).css('width', 100.0/segments+"%");
    di.style.backgroundColor = "yellow";
    document.getElementById("timeline").append(di);
        di.width = 100.0/segments+"%";
   // console.log(di.width);
    di.height = "100%";
    di.style.left = i*100/segments+"%";
  }

let entries = {};//don't touch this line
















//book notes

entries["1994.0"] = [["Africa",], ["political"], "Nelson Mandala", "Worked to end apartheid in South Africa"];

entries["2001.0"] = [["Americas",], ["political"], "9 11", "Terrorist attack destroys World Trade Center, in response is the War on Terror"];

entries["1994.010"] = [["Americas",], ["economic"], "NAFTA", "(North American Free Trade Agreement)"];

entries["1970.0"] = [["Americas",], ["political"], "Allende", "is elected president of Chile. Because he's socialist, the CIA helps a coup."];

entries["1979.0"] = [["Americas",], ["political"], "Sandinistas overthrow Somoza in Nicaragua", "shows growing strength of socialism in Latin America"];

entries["1979.0"] = [["Asia",], ["political"], "Shah of Iran overthrown by Islamic Revolution", "strains US/Iran relations"];

entries["1975.0"] = [["Asia","Americas",], ["political"], "Vietnam War ends", "The anti-war movement overcame the desire for containment"];

entries["1989.0"] = [["Europe",], ["political"], "Berlin Wall Falls", ""];

entries["1985.0"] = [["Europe",], ["political", "social"], "Gorbachevv becomes Soviet head of state", "hid domestic policys allow for enhanced freedom (glasnost) and sought to decentralize economy (perestroika)"];

entries["1990.01000"] = [["Europe",], ["political"], "Reunification of Germany", ""];

entries["1949.0010010"] = [["Europe","Americas",], ["political"], "NATO", "a mutual defense pack, a response to the fall of China."];

entries["1955.00000000000"] = [["Europe",], ["political"], "Warsaw Pact", "aliiance between Soviets and Satellite States, a response to the West mergining their parts of Germany"];

entries["1961.00000"] = [["Europe",], ["political"], "Germany buildsd Berlin Wall", ""];

entries["1962.000000"] = [["Americas",], ["political"], "Cuban Missile Crisis", "force establishment of backchannel between US and USSR, extremely close to actual conflict, Kruschev disgraced"];

entries["1947.0009210184448"] = [["Asia",], ["political"], "Parition of India", "Example of decolonization, India is split into Pakistan and India"];

entries["1959.0000042545219"] = [["Americas",], ["political"], "Fidel Castro leads revolution in Cuba", "He will increase US fear, come close to igniting the Cuban Missile Crisis."];

entries["1960.000477946609"] = [["Africa",], ["political"], "Nigeria gains independence", ""];

entries["1900.000562300126"] = [["Africa",], ["political","economic"], "Railroads connect ports of Africa to interior", "Allows increased mobility economically and in Scramble for Africa"];

entries["1909.000529713643"] = [["Africa",], ["political"], "African National Congress founded", "the main goal is securing voter rights for Coloureds (people of mixed race)"];

entries["1939.0004458281742"] = [["Africa","Europe",], ["social"], "A million Africans serve in WWII", "this will serve as a reason to throw of imperialism, once people saw the mistreatement of veterans."];

entries["1929.000843606695"] = [["Asia",], ["economic","political"], "March to the Sea", "Gandhi over salt laws, year later will call for independence"];

entries["1939.0003822366132"] = [["Asia", "Europe"], ["political"], "India joins WWII", "show leverage of colonies by Europeans, India uses as leverage for independence."];

entries["1931.0006705779213"] = [["Europe",], ["economic"], "Great Depression hits Europe", ""];

entries["1933.0000914294371"] = [["Europe",], ["political"], "Hitler comes to power", "due to economic depression, Treaty of Versailles, will shortly begin attacking (1939)"];

entries["1941.0009803924338"] = [["Europe",], ["political"], "Germany invades USSR", "This will turn the Soviets against Germany, the beginning of their defeat. It ends the alliance thaat Hitler and Stalin had made."];

entries["1945.000000000008893316567"] = [["Europe",], ["political"], "Germany surrenders in WW2", ""];

entries["1934.0001644462861"] = [["Asia",], ["social","political"], "Long March", "Mao and the Communists embark on the Long March, which would save the Communists party. Post WW2, they come to power."];

entries["1941.0000113981955"] = [["Americas","Asia",], ["political"], "Pearl Harbor", "jumpstarts US economy, gets US involved in WW2"];

entries["1945.04003171284493"] = [["Asia","Americas",], ["technology", "political"], "Atomic Bomb", "US drops atomic bomb on Hiroshima, they surrender shortly after."];

entries["1949.00037351348"] = [["Asia",], ["political"], "Communist Victory in China", "helps spur McCarthyism in US"];

entries["1914.0008872620454"] = [["Europe",], ["political","technology"], "Beginning of WW1", "Archduke Franz Ferdinand is assinated, due to intricate alliances and desire to test technology, Europe is engulfed in a war that will decimate their economy and cost over 16 million lives."];

entries["1917.000967729701"] = [["Europe",], ["social","political","culture"], "Bolshevic Revolution", "Cause Russia to leave WW1, communists will take Russia."];

entries["1900.0004432471937"] = [["Asia",], ["culture"], "Boxer Rebellion", "Anti-imperialist, anti-Christain uprising in China."];

entries["1911.0005393577587"] = [["Asia",], ["political"], "Xinhai Revolution", "Exchanged Qing for a Republic"];

entries["1865.0005672162702"] = [["Asia","Europe",], ["political"], "French conquer Indochina", ""];

entries["1898.0002751496518"] = [["Americas","Europe",], ["political"], "Cubans Revolt, Spanish-American War", "The Cubans revolt against Spanish rule and the US also fights the Spanish. This shows an example of US imperialism as the US kept the Phillipines."];

entries["1903.0003246628667"] = [["Americas",], ["economic","political"], "Panama Sucession", "US will help Panama secede and then build the Panama Canal to help with transportation."];

entries["1859.0006327409192"] = [["Europe","Americas",], ["culture"], "Charles Darwin: On the Origins of Species", "This challenges the Church's power further and will be used to explain the subjugation of both the poor and other races (social darwinism)"];

entries["1871.0000918752885"] = [["Europe",], ["political",], "Unification of Germany", "This would prompt the Scramble for Africa and lead to another power player in Europe. Example of nationalism during this time."];


entries["1867.0002820756397"] = [["Europe",], ["culture","political"], "Karl Marx: Das Kapital", "pointed out bad sides of capitalism, sets the stage for capitalism vs communism as philosophies"];

entries["1868.00028919449"] = [["Asia",], ["culture"], "Meiji Restoration", "The Meji Restoration would reinvent Japan as an Imperial power who could threaten powerhouses like China and eventually the US. This follows Commodore Perry's visit to Japan."];

entries["1850.0001720298615"] = [["Asia",], ["political","culture"], "Taiping Rebellion", "Led by the 'brother of Christ', they sought to overthrow the government and replace the moral/social order of the government."];

entries["1763.0003715846633"] = [["Europe",], ["political"], "End of Seven Years War", "spanned the entire world (known as French-Indian War too) and showed global power of Europe. The British won but had so much debt that they tried to tax American colonies, resulting in the American Revolution."];

entries["1834.000435127183"] = [["Europe",], ["social"], "British abolish slavery", ""];

entries["1867.0000667682186"] = [["Europe","Africa","Americas",], ["social", "economic"], "End of Atlantic slave trade", ""];


entries["1812.0004766708023"] = [["Europe","Americas",], ["political","economic"], "War of 1812", "Conflict between US and Britain over US maritime rights."];

entries["1808.00098605922"] = [["Americas","Europe",], ["political"], "Revolutions for independence begin in Spanish South America", ""];

entries["1888.01000340238507"] = [["Americas",], ["social"], "Brazil abolishes slavery", "They are the last country in the Western world to do so."];

entries["1846.0120089308135"] = [["Americas",], ["political"], "Mexico and United States War", "This would increase US borders and lead to the Civil War in the US because of debate of slavery in New Land."];

entries["1857.0112004902472588"] = [["Americas",], ["political"], "Mexico's Constitution limits power of Catholic Church, military", ""];

entries["1804.0901204259676234"] = [["Europe",], ["political"], "Napoleonic Wars begin", ""];

entries["1793.0000240378106"] = [["Europe",], ["political"], "Reign of Terror", "shows the mounting frustration of lower political classes as they take harsh measures against the enemies of the Revolution (nobles, priests)."];

entries["1795.0002724794297"] = [["Europe",], ["political"], "Directory rules France", ""];

entries["1582.0007768649896"] = [["Asia","Europe",], ["political"], "Russians conquer Khanata of Sibir", ""];

entries["1603.00090955047"] = [["Asia",], ["political","culture"], "Tokugawa Shogunate formed", "The final traditional Japanese governmentt, worked to keep Christianity away and stop outside forces."];

entries["1633.0009073985295"] = [["Asia","Europe",], ["economic"], "Tokugawa Shogunate closes trade with Europe.", ""];

entries["1644.0002059148064"] = [["Asia",], ["political"], "Qing Empire takes Beijing", ""];
entries["1762.000047883125"] = [["Asia","Europe",], ["culture"], "Catherine the Great", "an 'enlightened absolutist', she brought the enlightenment to Russia just as Peter had westernized Russia."];

entries["1514.0003243530575"] = [["Africa","Asia",], ["political"], "Selim I conquers Egypt and Syria", "this further expands the Ottoman Empire"];

entries["1520.0010008643817"] = [["Asia",], ["political",], "Shah Ismail establishes Safavid rule in Iran", ""];

entries["1587.000151449747"] = [["Asia",], ["political", "social"], "Reign of Shah Abbas parks peak of Safavid Empire", "developed the ghilman system (slave-soldiers in military and civil administration) and reformed the army."];

entries["1658.0007710499558"] = [["Asia",], ["political","culture"], "Aurangzeb rules the Mughal Empire", "He went back to conservative Islam, an exmaple of suppressing of other cultures in political systems."];

entries["1500.0007180704622"] = [["Americas","Europe",], ["economic"], "Spanish introduce sugar-cane cultivation to West Indies.", "Needed labor source of such as slavery and indentured servitude. Also, economic ties between America and Europe."];

entries["1620.0006278084456"] = [["Europe","Americas",], ["political","economic"], "English and French colonies in the Caribbean.", ""];

entries["1640.0003740683303"] = [["Americas","Europe",], ["economic"], "Dutch bring plantation system to Brazil.", ""];

entries["1660.3000396268611"] = [["Europe",], ["economic"], "English Navigation Acts", "developed, promoted, regulated English ships, trading, and commerce between other countries and its own colonies, a point of contention."];

entries["1700.2000466756538"] = [["Africa",], ["economic"], "Slave trade is predominant (til 1830)", ""];

entries["1500.0100865021596"] = [["Africa",], ["economic"], "Gold trade is predominent (til 1700)", ""];

entries["1540.0002982466017"] = [["Europe",], ["political","culture"], "Scientific Revolution begins", ""];

entries["1700.0008838236088"] = [["Europe",], ["political","culture"], "Enlightenment begins", ""];

entries["1546.0009014665995"] = [["Europe",], ["political","culture"], "German Wars of Religion", "show fragmentation caused by Protestant Reformation"];

entries["1300.0005892941679"] = [["Oceania",], ["political"], "Polynesian mass settlement of Pacific Islands ends.", ""];

entries["1519.09900520879626"] = [["Americas",], ["political"], "Cortes coquers Aztec Empire", ""];

entries["1531.012100875650924"] = [["Americas",], ["political"], "Pizarro conquers Inca Empire", ""];

entries["1405.000854699794"] = [["Asia",], ["economic"], "Voyages of Zheng He", "went from Southeast Asia to Africa, shows desire for exploration. The Ming stopped much sea exploration afterwards"];

entries["1200.0002349813763"] = [["Europe",], ["technology"], "Crossbows, longbows", "These become widespread"];

entries["1200.0002952919128"] = [["Europe",], ["technology"], "Windmills increase in use", ""];

entries["1400.0005622238214"] = [["Europe",], ["technology"], "Large cannons and hand-held firearms become prominent.", ""];

entries["1450.0003212007773"] = [["Europe",], ["technology"], "Printing", "first printing press with movable type reaches the West"];

entries["1210.0005471886175"] = [["Europe",], ["culture"], "Religious Orders", "Franciscans, Dominicans, shows power of religion"];

entries["1300.0001744570127"] = [["Europe",], ["culture"], "Rise of universities", ""];

entries["1313.0008934176135"] = [["Europe",], ["culture"], "Giovanni Boccaccio", "an example of a humanist writer."];

entries["1492.0006049698713"] = [["Europe",], ["culture"], "Expulsion of Jews from Spain", "importance of religion, descrimination in Europe against Jews"];

entries["1230.0009420562544"] = [["Africa",], ["political"], "Mali Empire founded", ""];

entries["1324.000176042256"] = [["Africa",], ["economic","culture"], "Mansa Musa's pilgrimage to Mecca", "shows richness from trade across Sahara, religion in tropical Africa."];

entries["1433.0000279745825"] = [["Africa",], ["political"], "Tuareg retake Timbuktu", "Tuareg are desert nomad group, Timbuktu was a major part of trans-Saharan trade"];

entries["1433.0005106349781"] = [["Africa",], ["political"], "Decline of Mali", ""];

entries["1206.0003844477746"] = [["Asia","Americas",], ["political"], "Delhi Sultanate founded in India", ""];

entries["1398.000525027494"] = [["Asia",], ["political"], "Decline of Delhi Sultanate", ""];

entries["1500.0003671535258"] = [["Asia",], ["economic"], "Port of Malacca at Peak", "Trading center, shows increased  trade during this time."];

entries["1221.0003512117128"] = [["Asia",], ["political"], "Mongols reach Iran", ""];

entries["1250.0009397465103"] = [["Africa","Asia",], ["political","social"], "Mamluk control Egygpt and Syria", "The Mamluks were a slave knight class controlled by their Muslim rulers."];

entries["1258.02003464698477"] = [["Asia",], ["political"], "Mongols take the capital of Abbasid Caliphate, Mongol expansion.", ""];

entries["1260.45006700849474"] = [["Asia","Europe",], ["political"], "Ilkhan vs the Golden Horde", "show fragmented Mongol's violence."];

entries["1333.000894961187"] = [["Asia",], ["political"], "Japan Shogunate", "End of Kamakura, beginning of Ashikaga"];

entries["1325.0005285479524184"] = [["Americas",], ["political"], "Aztec capital of Tenochtitlan founded", ""];

entries["1438.0001314585445"] = [["Americas",], ["political"], "Inca expansion begins", ""];

entries["1525.0003641831388"] = [["Americas",], ["political"], "Inca conquer Ecuador.", ""];

entries["1258.0003177688416"] = [["Asia",], ["political"], "Mongols end Abbasid Caliphate.", ""];

entries["1260.0006923204985"] = [["Asia",], ["political"], "Mamlucks defeat Mongols at Ain Jalut", "shows how powerful the Mamluks were"];

entries["1518.0000358955317"] = [["Americas",], ["HE"], "Smallpox arrives in Caribbean", ""];

entries["1573.0003085003866"] = [["Americas",], ["social", "culture"], "Spanish Mita", "begins, Spanish got idea from Inca Mita, way of coerced labor"];































entries["1211.0"] = [["Asia",], ["political"], "Genghis Khan takes China", "the Mongol horde will continue to expand, eventually leading to the Pax Mongolica"];
entries["1215.0"] = [["Europe"], ["political"], "Magna Carta", "King John signs the Magna Carta, limitting royal power"];
entries["1241.0"] = [["Europe"], ["political"], "Mongols in Europe", "Mongols invade Poland, withdraw when leader dies"];
entries["1271.0"] = [["Asia"], ["political"], "Yuan Dynasty", "Kublai Khan creates the Yuan dynasty in China"];
entries["1271.0"] = [["Asia", "Europe"], ["economic","HE"], "Polo to China", "Marco Polo visits the court of Kublai Khan and returns, writing of what he had seen. Shows increased trade, sparks European interest."];

//from the 1300-1399 one  
entries["1313.0"] = [["Africa",], ["economic"], "Mali and King Mansa Musa", "King Mansa Musa in Mali. Mali grows rich due to increased trade routes and the gold they have. He embarks on a pilgrimmage, and his wealth is such that inflation desroys economies." ];// "King Mansa Musa in Mali. Mali grows rich due to increased trade routes and the gold they have. He embarks on a pilgrimmage, and his wealth is such that inflation desroys economies."
entries["1325.0"] = [["Europe",], ["social","technology"], "Renaisance begins in Italy", "The Renaissance begins in Italy. This will lead to a re-investigatoin of Classical literature, increased literacy, and naval technology."];
entries["1337.0"] = [["Europe",], ["political", "technology"], "Hundred Years' War begins", "The Hundred Years' War begins. This sees France defying England's power. Furthermore, it illustrates the usefulness of gunpowder."];

entries["1347.0"] = [["Europe",], ["political","HE"], "Black Death", "The Bubonic Plague hits Europe. Due to the number of people killed, fuedalism is no longer as viable. "];
entries["1368.0"] = [["Asia",], ["political", "economic"], "Beginning of Ming Dynasty in China.", "The Ming would engage in lots of trade. Notably, silver trade. Also, paper money would be used (backed up by the silver)."];

entries["1407.0"] = [["Europe",], ["economic"], "Casa di San Giorgio", "One of the first public banks is founded in Genoa. Evidence of increased economic activity, the ability to borrow money."];
entries["1486.0"] = [["Europe","Africa",], ["economic","technology","HE"], "Europeans sail around Cape of Good Hope", "This would open increase sea-based trade eventually to the Indian Ocean Basin, hurt trade based kingdoms in the Middle East. It shows the advances in naval technology."];
//from the 1400-1499 one
entries["1438.0"] = [["Americas",], ["political"], "Inca", "The Inca rule in Peru. Their Mita system allowed for mass construction; the Spanish would eventually come up with their own, harshe version of this."];
entries["1450.0"] = [["Europe",], ["social","economic"], "Medici and Florence", "Under the Medici, Florence becomes the center of Renaisance art/learning."];
entries["1453.0"] = [["Europe","Africa","Asia",], ["political"],"Fall of Constantinople",  "The Ottoman Empire takes over Constantinople, marking the end of the Byzantine Empire. Shows the power of the Ottomons."];
entries["1453.01"] = [["Asia","Europe",], ["political"], "Ivan the Great", "Ivan the Great ends tribute payment to Mongols, expands the borders of Russia."];

entries["1455.0"] = [["Europe",], ["culture"], "Bible", "Gutenberg completes the first Bible"];
entries["1492.0"] = [["Europe",], ["political"], "Ferdinand and Isabella conquer the Moors in Spain", ""];
entries["1492.01"] = [["Europe","Americas","Africa",], ["economic","HE","culture"], "Columbian Exchange", "Connects America, Europe, and Africa, creating a mass spread of crops and diseases, economic oppurtunity in Europe, and exchange of culture."];
//from the 1500-1599 one
entries["1501.0"] = [["Americas","Africa",], ["economic","HE", "culture"], "Slaves", "The first black slaves in America are brought to the Spanish colony of Santo Domingo."];

entries["1517.0"] = [["Europe",], ["culture"], "Protestant Reformation", "Luther publishes his 95 theses denouncing the Catholic Church. This begins to break the Catholic Church's stronghold and splits people into Protestant vs Catholic."];
entries["1520.0"] = [["Asia","Europe",], ["political"], "Suleiman the Magnificent", "He becomes Sultan of Turkey, obliterating enemies in Hungary then Rhodes."];
entries["1535.0"] = [["Europe",], ["political","culture"], "Henrry VIII and Church of England", "King Henry creates the Church of England, leading to religious violence in England that lasts for quite some time as Protestant and Catholic monarchs come to power."];

entries["1545.0"] = [["Europe",], ["culture","political"], "Council of Trent", "The Council of Trent meets as a response to the Protestant Reformation. Jesuits will become essential in spreading Christianity."];

entries["1553.0"] = [["Europe",], ["political"], "England", "Mary I restores Catholicism to England."];

entries["1556.0"] = [["Asia",], ["social","political"], "Ahkbar the Great", "He expands the Mogul Empire and is an example of religious tolerance to control a large number of people with different religious convictions."];

entries["1558.0"] = [["Europe",], ["political"], "England", "Queen Elizabeth brings back Protestant ideology to England's throne."];

entries["1588.00"] = [["Europe",], ["political"], "Spanish Armada", "The Spanish Armada is defeated by the English, marking the rising power of England compared to the diminishing power of Spain."];
//finished -1599

entries["1600.0"] = [["Europe","Asia",], ["economic","political"], "English East India Company is established", ""];

entries["1607.0"] = [["Americas",], ["culture","economic"], "Jamestown", "Jamestown is founded. They will imporant slaves for tobacco production and serve as aa blueprint for one version of America."];

entries["1610.0"] = [["Europe",], ["culture", "technology"], "Gelileo", "He sees the moons of Jupiter. The Church denies his later work and this science vs religion would continue to shatter the Church's stronghold over Europe."];

entries["1642.0"] = [["Europe",], ["political"], "English Civil War", "This would eventually lead to a Constitutional Monarchy. This earlier transition gives England the stability to form a great empire later."];

entries["1644.0"] = [["Asia",], ["political"], "End of Ming Dynasty", ""];

entries["1661.0"] = [["Europe",], ["political"], "Louis XIV begins ruling as an absolute monarch.", ""];

entries["1618.000"] = [["Europe",], ["political","culture"], "Thirty Years War", "Start of this war of Protestant revolts against Catholic oppression, severely damages Germany's population."];

entries["1689.0"] = [["Europe",], ["political","culture"], "Peter the Great", "He attempts to westernize Russia, builds St. Petersburg."];
//done with to 1699, below need 1700-1799
entries["1707.0"] = [["Europe",], ["political"], "Great Britain formed", ""];

//entries["1762.0"] = [["Asia","Europe",], ["political","culture"], "Catherine the Great of Russia", "She continues military expansion and leads Russia into participating in more European culture."];

entries["1765.0"] = [["Europe",], ["technology"], "Inventions", "Precursor to Industrial Revolution, the Steam Engine and then later the spinning machine are invented."];


//have gone back and recategorized seve4ral things

entries["1775.0"] = [["Europe","Americas",], ["political","economic"], "American Revolution", "The American Revolution. Challenges mercentylism as colonies don't want trade restricted just to one country in Europe, showing the problems with mercentylism."];

entries["1789.0"] = [["Europe",], ["social","political","economic"], "French Revolution", "The French Revolution begins, spurred by the less politically powerful bourgeoisie and the poor, lower classes. "];


entries["1793.0"] = [["Americas",], ["technology"], "Cotton Gin", "The cotton gin in invented, an industrial invention that would lead to the S. supplying Europe wiith a lot of cotton."];

entries["1804.0"] = [["Americas","Europe",], ["political"], "Haiti declares independence from France.", ""];

entries["1799.0"] = [["Europe",], ["political"], "Napoleon", "Napoleon leads a coup against the Directory, becomes First Consul. He will continue to expand, a threat to Europe that forced those countries to turn their attention away from their colonies."];

entries["1815.0"] = [["Europe",], ["political"], "At Waterloo, Napoleon did surrender", "After being defeated once, Napoleon returns and gets defeated at Waterloo."];

entries["1819.0"] = [["Americas","Europe",], ["political"], "Liberation of New Granada", "Spain, who had begun to lose control of their colonies when Napoleon attacked, loses hold of New Granda."];

entries["1823.0"] = [["Americas",], ["political"], "Monroe Doctrine", "Says European nations should not interfere in Western Hemisphere."];

entries["1839.0"] = [["Europe","Asia",], ["economic", "political"], "First Opium War", "Britain and China fight over British importing opium to China."];

entries["1848.0"] = [["Europe",], ["political","social"], "Year of Revolutions", ""];

entries["1853.0"] = [["Europe",], ["technology"], "Crimean War", "First industrial war, shows how much industrializatoin has changed things."];

entries["1859.0"] = [["Africa","Europe",], ["economic"], "Suez Canal", "Work begins on the Suez Canal, which European nations would take advantage of."];

entries["1861.0"] = [["Americas",], ["social"], "Civil War", "Shows antislavery in US, overhaul of slavery after 13th amendment"];

entries["1884.0"] = [["Europe","Africa",], ["political","economic"], "Berlin West Africa Conference", "European nations discuss how to expand into Africa, allows Germanny to get in on the imperializing."];

entries["1894.0"] = [["Asia",], ["political", "techonology"], "Sino-Japanese War", "Demonstrates advantages of industrialization, Japan's power and China's diminishing power."];

//done with -1899, haven't done past











//console.log("The entries logging");
//console.log(entries);

//BIGENTRIES = entries;
//Object.assign(BIGENTRIES, entries);

//bIGENTRIES = R.clone(entries);


/*
  entries["1555"] = ["Europe", ["economic"], "bank in England", "someone made a whole lot of money and the description is long and is as follows etc. etc."];
  entries["1556"] = ["Europe", ["HE"], "enviornment stuff", "stuff happens to the enviornment"];
  entries["1700"] = ["Europe", ["political"], "stuff happens", "leader somewhere is killed"];
    entries["1600"] = ["Africa", ["social"], "social thing", "something happens to social"];
  entries["1640"] = ["Asia", ["culture"], "culture thing", "something happens to culture"];
  entries["1540"] = ["Oceania", ["technology"], "tech thing", "something happens w/ tech"];
  entries["1450"] = ["Americas", ["political"], "political thing", "something happens w/ political structure"];
   entries["1200"]  = ["Asia", ["political"], "political thing", "something happens w/ political structure"];
   entries["1788"] = ["Asia", ["political"], "political thing", "something happens w/ political structure"];
   entries["1900"] = ["Oceania", ["technology"], "tech thing", "something happens w/ tech"];

      entries["1525"] = ["Oceania", ["technology"], "tech thing", "something happens w/ tech"];*/
  //console.log(entries);
  //makeTimeLine(time1, time2, entries, segments);
periodBasedTimeLine(entries);
//adding eventListeners to all checkboxes so that this updates when they are checked/unchecked

var inputs = document.getElementsByTagName("input");
//console.log(inputs);
for (var i = 2; i<inputs.length; i++) {
  //console.log(inputs[i]);
//  if (inputs[i].type == "checkbox") {
  //  inputs[i].innerHTML = "hi";
  //  inputs[i].addEventListener("click", makeTimeLine(time1, time2, entries, segments));
  inputs[i].addEventListener("click", function() {
  periodBasedTimeLine(entries);}, segments);
  //  console.log("remaking timeline, need to change to other func which will call remaking timeline");//periodBasedTimeLine(entries0)
//  }
}

if (adding) {
    document.getElementById("mySubmit").addEventListener("click", reWIDTH(entries));
}


//document.getElementById("mySubmit").innerHTML = "hi";


 $("#mySubmit").on("click", function(e) {
  console.log("starting");
  let firstvar = document.getElementById("theText");
  let x = $("#theText");

  var thisVar =x.val();
  console.log("start0");
  console.log(firstvar);
  console.log(thisVar);
  //var thisVAR = $("#theText").val();

 /* if (thisVar == null) {
    console.log("unde");
    thisVar = 150;
  }*/
  
 // console.log(thisVAR);
  console.log("INFORMATION ON ");
  //timeline and lineOfTimeLine
   
  $("#timeline").css("width", thisVar+"em");
  console.log("logging width");
  console.log(thisVar);
  $("#lineOfTimeLine").css("width", thisVar+"em");
  console.log("adjustingg");
  console.log($("#timeline").css("width"));
  if (thisVar != null)
    restart(thisVar+"em", false);

});

console.log("end of starting");
  }











/*blocked while testing writing function
  for (var key in entries) {
    var timeNow = parseInt(key);
    var listofStuff = entries[key];
    var d = document.createElement("div");
    d.style.borderWidth = ".05em";
    var classAd = listofStuff[1];
    for (var i = 0; i<classAd.length; i++){
   
       d.classList.add(classAd[i]);
    }
    //in the future should partition timeline into say 10 groups and then sort underneath by time
    var c = document.createElement("span");
    c.innerHTML = ("<b>"+key+ ": " +entries[key][2]+"</b><br>"+entries[key][3]);
    d.appendChild(c);
    var which = 3;
    var timeD = time1;
    while (timeD<timeNow) {
      which++;
      timeD = timeD+ (time2-time1)/segments;
    }
   // console.log(which);
   // console.log(document.getElementById("timeline").childNodes)

    //need to do timeline.childElements
    document.getElementById("timeline").childNodes[which].append(d);
    d.style.backgroundColor = "white";

    }
*/
    /*
//getting list of all checked boxes to compare w/
    var hold = document.getElementsByName("themes");

    //console.log('hi');
    console.log(hold[1].value);
    var checkThemes = [];
    for (var i = 0; i<hold.length; i++) {
     // console.log("here");
      if (hold[i].checked == true) {
        checkThemes.push(hold[i].value);
      }
      
    }

    console.log(checkThemes);//contains all valid themes

  */


/*
$("#mySubmit").on("click", function(e) {
  console.log("starting");
  let firstvar = document.getElementById("theText");
  console.log("start0");
  console.log(firstvar);
  let thisVAR =  document.getElementById("theText").value;
  
 // console.log(thisVAR);
  console.log("INFORMATION ON ");
  //timeline and lineOfTimeLine
   
  $("#timeline").css("width", thisVAR+"em");
  console.log(thisVAR);
  $("#lineOfTimeLine").css("width", thisVAR+"em");
  console.log("adjustingg");
  console.log($("#timeline").css("width"));
  periodBasedTimeLine(entries);
  //restart();
});*/


function reWIDTH(entries) {
//    $("#mySubmit").on("click", function(e) {
  console.log("starting");
  let firstvar = document.getElementById("theText");
  let x = $("#theText");

  var thisVar =x.val();
  console.log("start0");
  console.log(firstvar);
  console.log(thisVar);
  //var thisVAR = $("#theText").val();

 /* if (thisVar == null) {
    console.log("unde");
    thisVar = 150;
  }*/
  
 // console.log(thisVAR);
  console.log("INFORMATION ON ");
  //timeline and lineOfTimeLine
   
  $("#timeline").css("width", thisVar+"em");
  console.log("logging width");
  console.log(thisVar);
  $("#lineOfTimeLine").css("width", thisVar+"em");
  console.log("adjustingg");
  console.log($("#timeline").css("width"));
  if (thisVar != null)
    restart(thisVar+"em", false);

//});
}
