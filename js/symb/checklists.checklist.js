  $(document).ready(function() {
    //Filter autocomplete
    $("#taxonfilter").autocomplete({ 
      source: function( request, response ) {
        $.getJSON( "rpc/searchsuggest.php", { term: request.term, clid: clid, deep: 1 }, response );
      }
    },
    { minLength: 3 });

    //Species add form
    $("#speciestoadd").autocomplete({
      source: function( request, response ) {
        $.getJSON( "rpc/speciessuggest.php", { term: request.term }, response );
      }
    },{ 
      minLength: 4,
      autoFocus: true,
      select: function( event, ui ) {
        if(ui.item){
          $( "#speciestoadd" ).val(ui.item.value);
          $( "#tid" ).val(ui.item.id);
        }
      },
      change: function( event, ui ) {
        if(ui.item === null) {
          $( "#tid" ).val("");
          if($( "#speciestoadd" ).val() != ""){
            alert(lang_SELECT_TAXON);
            $("#speciestoadd").focus();
          }
        }
      }
    });
    
    if(document.cookie.indexOf("editspp") > -1){
      $(".editspp").show();
      document.getElementById("editsppon").style.display = "inline";
    }
    if(taxaCount == 0) $(".editspp").show();
  });

  function toggleVoucherDiv(tid) {
    toggle("voucdiv-" + tid);
    toggle("morevouch-" + tid);
    toggle("lessvouch-" + tid);
    //anchorObj.style.display = "none";
    return false;
  }

  function toggleSppEditControls() {
    if (document.cookie.indexOf("editspp") > -1) {
      document.cookie = "editspp=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.getElementById("editsppon").style.display = "none";
      $(".editspp").hide();
    } else {
      document.cookie = "editspp=1";
      document.getElementById("editsppon").style.display = "inline";
      $(".editspp").show();
    }
  }

  function toggle(target) {
    $("." + target).toggle();
    $("#" + target).toggle();
  }

  function openIndividualPopup(occid) {
    var indUrl = "../collections/individual/index.php?occid=" + occid;
    openPopup(indUrl, "indwindow");
    return false;
  }

  function openPopup(urlStr, windowName) {
    newWindow = window.open(
      urlStr,
      windowName,
      "scrollbars=1,toolbar=0,resizable=1,width=1000,height=800,left=400,top=40"
    );
    if (newWindow.opener == null) newWindow.opener = self;
    return false;
  }

  function showImagesChecked(f) {
    if (f.showimages.checked) {
      document.getElementById("wordicondiv").style.display = "none";
      f.showsynonyms.checked = false;
      document.getElementById("showsynonymsdiv").style.display = "none";
      f.showvouchers.checked = false;
      document.getElementById("showvouchersdiv").style.display = "none";
      f.showauthors.checked = false;
      document.getElementById("showauthorsdiv").style.display = "none";
    } else {
      document.getElementById("wordicondiv").style.display = "block";
      document.getElementById("showsynonymsdiv").style.display = "block";
      document.getElementById("showvouchersdiv").style.display = "block";
      document.getElementById("showauthorsdiv").style.display = "block";
    }
  }

  function validateAddSpecies(f) {
    //var sciName = f.speciestoadd.value;
    //var tid = f.tid.value;
    if(f.speciestoadd.value !== "" && f.tid.value !== ""){
      f.submit();
    }
    else if (f.speciestoadd.value == "") {
      alert(lang_NAME_BLANK);
    } 
    else {
      alert(lang_SELECT_TAXON);
    }
    f.speciestoadd.focus();
    return false;
  }

  function changeOptionFormAction(action, target) {
    document.optionform.action = action;
    document.optionform.target = target;
  }

  //Misc functions
  Array.prototype.unique = function () {
    var a = [];
    var l = this.length;
    for (var i = 0; i < l; i++) {
      for (var j = i + 1; j < l; j++) {
        if (this[i] === this[j]) j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  //Game menu
  var timeout = 500;
  var closetimer = 0;
  var ddmenuitem = 0;

  // open hidden layer
  function mopen(id) {
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if (ddmenuitem) ddmenuitem.style.visibility = "hidden";

    // get new layer and show it
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.visibility = "visible";
  }
  // close showed layer
  function mclose() {
    if (ddmenuitem) ddmenuitem.style.visibility = "hidden";
  }

  // go close timer
  function mclosetime() {
    closetimer = window.setTimeout(mclose, timeout);
  }

  // cancel close timer
  function mcancelclosetime() {
    if (closetimer) {
      window.clearTimeout(closetimer);
      closetimer = null;
    }
  }

  // close layer when click-out
  document.onclick = mclose;
