(function(window){
  /*
  This program is distributed under the terms of the MIT license.
  Copyright 2016 - Marcin Kołodziejczak <kolodziejczak.mn@gmail.com>

  Downloaded from https://github.com/kolodziejczakM
  */
  /////Basic configuration//////////////

  let banach_cfg = {
    source: null,
    printAll: true,
    printInvoked: true,
    printInvokedNames: false,
    performance_check: true,
    invoking_path:false,  // Needs opened console panel to unlock full functionality.
    code_lines:true,
    empty_lines:true
  };

  let banach_popup = {
    visibility: false,
    header: null,
    message: null
  };
  const getNode_withAttr = function (lib_attr){
    const all_nodes = document.getElementsByTagName('*');
    for (let i = 0, n = all_nodes.length; i < n; i++){
      if (all_nodes[i].getAttribute(lib_attr) !== null){
        //console.log("TypeOf sourcecode: ", typeof all_nodes[i]);
        return all_nodes[i];
      }
    }
  }
  const source_code = getNode_withAttr("data-banach");
  banach_cfg.source = source_code.innerHTML;
  if(source_code.getAttribute("data-banach-gui") === "1"){
    banach_cfg.gui = true;
  }
  if(source_code.getAttribute("data-js-ver") === "es5"){
    banach_cfg.language = "es5";
  }
  if(source_code.getAttribute("data-js-ver") === "es6"){
    banach_cfg.language = "es6";
  }
  if(source_code.getAttribute("data-banach-angular") === "1"){
    banach_cfg.angular = true;
  }
  /////configuration end//////////////

  /////interface//////////////
  if(banach_cfg.gui){
    const nav_style ="html,body{margin:0;padding:0;width:100%;height:100%;}#banach-interface{position:fixed;margin:0;width:100vw;height:80px;opacity:0.48;background-color:#0086FF;display:-webkit-flex;display:flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;}.banach-button{font-size:14px;font-family:sans-serif;display:-webkit-flex;display:flex;justify-content:center;-webkit-justify-content:center;-webkit-align-items:center;font-style:italic;text-align:center;border:2px solid white;color:white;background-color:chocolate;border-radius:15px 15px;padding-top:3px;padding-bottom:4px;margin:15px;width:230px;height:30px;cursor:pointer}.banach-button:hover{background-color:brown;}.active{background-color:#067046;}.active:hover{background-color:#067025;}.banach-clicked{background-color:olive;}@media all and (max-width:1160px){.banach-button{font-size:8px;}}@media all and (max-width:650px){#banach-interface{-webkit-flex-direction:column;flex-direction:column;margin:0 auto;height:300px;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;}}";

    const toggleClicked = function (element){
      if(element.className.indexOf("banach-clicked")>=0){
        element.classList.remove("banach-clicked");
      }else{
        element.className += " banach-clicked";
      }
    }

    let lib_div = document.createElement('div');
    lib_div.id = 'banach-interface';

    let printAll_button = document.createElement('div');
    printAll_button.className = 'banach-button banach-print-all';
    if(banach_cfg.printAll){
      printAll_button.className +=' active';
    }
    printAll_button.innerHTML = 'PRINT ALL';
    printAll_button.onclick = function(e){
      toggleClicked(e.target);
      banach_popup.visibility=true;
      banach_popup.header = "Banach> Print all";
      banach_popup.message = printAll();
      alert(banach_popup.message);
    };

    let printInvoked_button = document.createElement('div');
    printInvoked_button.className = 'banach-button banach-print-invoked';
    if(banach_cfg.printInvoked){
      printInvoked_button.className +=' active';
    }
    printInvoked_button.innerHTML = "PRINT INVOKED";
    printInvoked_button.onclick = function(e){
      toggleClicked(e.target);
      banach_popup.visibility=true;
      banach_popup.header = "Banach> Print Invoked";
      banach_popup.message = printInvoked();
      alert(banach_popup.message);
    };

    let printInvokedNames_button = document.createElement('div');
    printInvokedNames_button.className = 'banach-button banach-print-names';
    if(banach_cfg.printInvokedNames){
      printInvokedNames_button.className +=' active';
    }
    printInvokedNames_button.innerHTML = "PRINT INVOKED (NAMES)";
    printInvokedNames_button.onclick = function(e){
      toggleClicked(e.target);
      banach_popup.visibility=true;
      banach_popup.header = "Banach> Print Invoked (names)";
      banach_popup.message = printInvokedNames();
      alert(banach_popup.message);
    };

    let performance_check_button = document.createElement('div');
    performance_check_button.className = 'banach-button banach-performance-check';
    if(banach_cfg.performance_check){
      performance_check_button.className +=' active';
    }
    performance_check_button.innerHTML = "CHECK PERFORMANCE";
    performance_check_button.onclick = function(e){
      toggleClicked(e.target);
      banach_popup.visibility=true;
      banach_popup.header = "Banach> Performance check";
      banach_popup.message = `Banach> Your code was executing about: <strong>${performance_check()}</strong> milliseconds.`;
      alert(banach_popup.message);
    };

    let invoking_path_button = document.createElement('div');
    invoking_path_button.className = 'banach-button banach-invoking-path';
    if(banach_cfg.invoking_path){
      invoking_path_button.className +=' active';
    }
    invoking_path_button.innerHTML = "INVOKING PATH";
    invoking_path_button.onclick = function(e){
      toggleClicked(e.target);
      banach_popup.visibility=true;
      banach_popup.header = "Banach> Invoking path";
      banach_popup.message ="Banach> Open your console panel (debugger). Banach start in 5 seconds.";
      alert(banach_popup.message);
      console.info("Banach> Preparing to 'invoking path'...");
      const prepare_console =function (){
        setTimeout(function(){
          invoking_path();
        }, 5000);
      }
      prepare_console();
    };

    let sheet = document.createElement('style')
    sheet.innerHTML = nav_style;

    lib_div.appendChild(printAll_button);
    lib_div.appendChild(printInvoked_button);
    lib_div.appendChild(printInvokedNames_button);
    lib_div.appendChild(performance_check_button);
    lib_div.appendChild(invoking_path_button);

    let alertButton_txt = "Ok";

    if(document.getElementById) {
        window.alert = function(txt) {
            createCustomAlert(txt);
        }
    }
  const alert_style ="#banach-modal{background-color:rgba(0, 0, 0, 0.48);position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;}#banach-alertBox{position:relative;width:300px;min-height:100px;margin-top:50px;border:1px solid #FFF;background-color:#fff;background-repeat:no-repeat;background-position:20px 30px;word-wrap:break-word;}#banach-modal >#banach-alertBox{opacity:0.85;border-radius: 15px 15px;position:fixed;}#banach-alertBox h1 {opacity:0.48;border-radius:15px 15px 0 0;border:2px solid white;padding:10px;margin:0;font:italic bold 0.9em sans-serif,arial;background-color:#0086FF;color:#FFF;border-bottom:1px solid #FFF;}#banach-alertBox p {border:2px solid rgba(47,44,44,0.3);margin-left:5px;margin-right:5px;border-radius:5px;overflow:auto;font:0.9em sans-serif,arial;height:50px;padding:15px;padding-top:7px;}#banach-alertBox #banach-closeBtn {opacity:0.48;display:block;position:relative;margin:10px auto;padding:12px;border:0 none;width:70px;font:italic 0.9em verdana,arial;text-transform:uppercase;text-align:center;color:#FFF;background-color:#067025;border-radius: 10px;text-decoration:none;}#banach-closeBtn:focus{outline:0;}";

  sheet.innerHTML += alert_style;

    const createCustomAlert = function (txt) {
        d = document;

        if(d.getElementById("banach-modal")) return;

        mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
        mObj.id = "banach-modal";
        mObj.style.height = d.documentElement.scrollHeight + "px";

        alertObj = mObj.appendChild(d.createElement("div"));
        alertObj.id = "banach-alertBox";
        if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
        alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
        alertObj.style.visiblity="visible";

        h1 = alertObj.appendChild(d.createElement("h1"));
        h1.appendChild(d.createTextNode(banach_popup.header));

        msg = alertObj.appendChild(d.createElement("p"));
        msg.innerHTML = txt;

        btn = alertObj.appendChild(d.createElement("a"));
        btn.id = "banach-closeBtn";
        btn.appendChild(d.createTextNode(alertButton_txt));
        btn.href = "#";
        btn.focus();
        btn.onmouseover = function(){
        btn.style.backgroundColor = "#067046";
        };
        btn.onmouseout = function(){
        btn.style.backgroundColor = "#067025";
        };
        btn.onclick = function() {
          (banach_cfg.printAll)?printAll_button.className += " active":printAll_button.classList.remove("active");
          printAll_button.classList.remove("banach-clicked");
          (banach_cfg.printInvoked)?printInvoked_button.className += " active":printInvoked_button.classList.remove("active");
          printInvoked_button.classList.remove("banach-clicked");
          (banach_cfg.printInvokedNames)?printInvokedNames_button.className += " active":printInvokedNames_button.classList.remove("active");
          printInvokedNames_button.classList.remove("banach-clicked");
          (banach_cfg.performance_check)?performance_check_button.className += " active":performance_check_button.classList.remove("active");
          performance_check_button.classList.remove("banach-clicked");
          (banach_cfg.invoking_path)?invoking_path_button.className+=" active":invoking_path_button.classList.remove("active");
          invoking_path_button.classList.remove("banach-clicked");

          banach_popup.visibility = false;
          removeCustomAlert();
          return false;
        }
        alertObj.style.display = "block";
    }
    const removeCustomAlert = function () {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("banach-modal"));
    }
    document.head.appendChild(sheet);
    document.body.appendChild(lib_div);
  }
  /////interface end/////////////

  /////lib brain/////////////
  if(source_code.getAttribute("data-banach") === "functional_analysis"){
    var t0 = performance.now();

    let code_lines= banach_cfg.source.match(/[\r\n]/g);
    (code_lines) ? code_lines = code_lines.length : code_lines = 0;
    if(banach_cfg.code_lines){
      console.info("Banach> Your script has "+code_lines+" lines of code.");
    }

    let empty_lines= banach_cfg.source.match(/^\s*$/gm);
    (empty_lines) ? empty_lines = empty_lines.length : empty_lines = 0;
    if(banach_cfg.empty_lines){
      console.info("Banach> Your script has "+empty_lines+" empty lines.");
    }

    if(banach_cfg.language === "es5"){
      var fn_expr_decl_inv = /var\s\w{1,35}\s=\sfunction\s?\(\)|var\s\w{1,35}\s=\sfunction\s?\((\w{1,35}?|\S{1,35}?,?){1,10}?\)|\w{1,35}\s=\sfunction\s?\(\)|\w{1,35}\s=\sfunction\s?\((\w{1,35}?|\S{1,35}?,?){1,10}?\)|function\s\w{1,35}\s?\(\)|function\s\w{1,35}\s?\((\w{1,35}?|\S{1,35}?,?){1,10}?\)|\w{1,35}\s?\(\);?|\w{1,35}\s?\((\w{1,35}?|\S{1,35}?,?){1,10}?\);?/g;

      if(banach_cfg.angular){
        var fn_expr_decl_inv;
      }

    }else if(banach_cfg.language === "es6"){
      var fn_expr_decl_inv;

      if(banach_cfg.angular){
        var fn_expr_decl_inv;
      }
    }else{
      banach_popup.visibility = true;
      banach_popup.header = "Language version problem";
      banach_popup.message = "There is lack of attribute that specify your JS version code.";
      if(banach_cfg.gui && banach_popup.visibility){
        alert(banach_popup.message);
      }else{
        console.warn(banach_popup.message);
      }
    }
    //up to 10 parameters, names up to 35 chars

    // var name = function () {} //odp. var lol = function ()
    // var name = function(x,?,?) //odp. var przemo = function(name)
    // name = function () {} //odp. printing = function()
    // name = function (x,?,?) //odp. adding = function (x,y)
    // function name () {} //odp. function marcin()
    // function name (x,?,?) //odp. function edward(name,age)
    // name(); //odp. marcin();
    // name(x,?,?); //odp. edward(edzio,15,1998,3,1);

    const fn_expr_decl_inv_exe = banach_cfg.source.match(fn_expr_decl_inv);
    function printAll(){
      console.info("Banach> Banach found these functions in your code: ");
      console.dir(fn_expr_decl_inv_exe);
      let all_message = "1. "+fn_expr_decl_inv_exe[0]+"</br>";
      for(let i =1;i<fn_expr_decl_inv_exe.length;i++){
        all_message += "\n"+(i+1)+". "+fn_expr_decl_inv_exe[i]+"</br>";
      }
      if(banach_cfg.gui){
        all_message += "</br><strong>Your script has "+code_lines+" lines of code.</strong></br>";
        all_message += "<strong>Your script has "+empty_lines+" empty lines.</strong></br>";
      }
      return all_message;
    };
    if(banach_cfg.printAll){
      printAll();
    }

    var fn_inv_exe = fn_expr_decl_inv_exe.filter((el)=>{
      return (el.indexOf("function") === -1) ? true : false;
    });
    fn_inv_exe = fn_inv_exe.map((el)=>{
      let b1 = el.match(/\(/g).length;
      let b2 = el.match(/\)/g).length;
      if(b1 === b2){
        return el;
      }else if(b1 > b2){
        el +=");";
        return el;
    }});

    const fn_inv_name = fn_inv_exe.map((el)=>{
      el.toString();
      const name_only = el.slice(0,el.indexOf("("))
      return name_only;
    });

    function printInvoked (){
      console.info("Banach> Found invoked functions from your code:");
      console.dir(fn_inv_exe);
      let inv_message = "1. "+fn_inv_exe[0]+"</br>";
      for(let i =1;i<fn_inv_exe.length;i++){
        inv_message += "\n"+(i+1)+". "+fn_inv_exe[i]+"</br>";
      }
      return inv_message;
    };

    if(banach_cfg.printInvoked){
      printInvoked();
    }
    function printInvokedNames (){
      console.info("Banach> Found names of invoked functions from your code:");
      console.dir(fn_inv_name);
      let inv_names_message = "1. "+fn_inv_name[0]+"</br>";
      for(let i =1;i<fn_inv_name.length;i++){
        inv_names_message += "\n"+(i+1)+". "+fn_inv_name[i]+"</br>";
      }
      return inv_names_message;
    };
    if(banach_cfg.printInvokedNames){
      printInvokedNames();
    }
  // examined code performance module //

    function performance_check (){
      const performance_studies = function (){
        performance_start = performance.now();
        return performance_start;
      }
      const performance_studies_end = function (){
        performance_end = performance.now();
        console.info(`Banach> Your code was executing about:  ${performance_end - performance_start}  milliseconds.`);
        return performance_end-performance_start;
      }
      const performance_script = document.createElement("SCRIPT");
      performance_script.innerHTML = performance_studies() + source_code.innerHTML + performance_studies_end();
      document.getElementsByTagName('head')[0].appendChild(performance_script);
      if(banach_cfg.gui){
        return performance_end-performance_start;
      }
    };
    if(banach_cfg.performance_check){
      performance_check();
    }

  // examined code performance module end //

  // function injection - examining when particular function gets called //

    function invoking_path (){
      let cage="";
      const injection_script = document.createElement("SCRIPT");
      const injection_fn = function(){
          for(let i = 0 ; i<fn_inv_exe.length;i++){
              cage += "debugger; \n"+fn_inv_exe[i]+"\n ";
              console.info((i+1)+": "+fn_inv_exe[i]+"\n ");
          }
          return cage;
      }
      injection_script.innerHTML = source_code.innerHTML + injection_fn();
      document.getElementsByTagName('head')[0].appendChild(injection_script);
    };
    if(banach_cfg.invoking_path){
      invoking_path();
    }

  // function injection - examining when particular function gets called end //

  }else{
    banach_popup.visibility = true;
    banach_popup.header = "Mounting error";
    banach_popup.message = "Your script has not attached 'data-banach' attribute."
    if(banach_cfg.gui && banach_popup.visibility){
      alert(banach_popup.message);
    }else{
      console.warn(banach_popup.message);
    }
  }
  /////lib brain end/////////////
  const t1 = performance.now();
  console.info(`Banach> Banach work with your code about ${t1 - t0} milliseconds.`);

})(window);
