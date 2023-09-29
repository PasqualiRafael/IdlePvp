$(document).ready(function () {
  var logs = 0;
  var stones = 0;
  var money = 0;
  var logPlus = 1;
  var stonePlus = 1;
  var pickaxe = 1;
  var autoLogPlus = 0;
  var autoStonePlus = 0;
  var autoCutPrice = 10;
  var pickaxePrice = 5;
  var logPrice = 1;
  var menu;

  setInterval(function () {
    logs += autoLogPlus;
    stones += autoStonePlus;
    changeInventory();
    changeShop();
  }, 1000);

  $("#cut").click(function () {
    logs += logPlus;
    changeInventory();
    changeShop();
  });

  $("#minestone").click(function () {
    if (pickaxe < 2) {
      alert("You don't have enough pickaxes");
    } else {
      stones += stonePlus;
      changeInventory();
      changeShop();
    }
  });

  $("#visitshop").click(function () {
    menu = switchMenu("shop");
    changeShop();
  });

  $("#sell1").click(function () {
    logs--;
    money += logPrice;
    changeInventory();
    changeShop();
  });

  $("#sell10").click(function () {
    logs -= 10;
    money += logPrice * 10;
    changeInventory();
    changeShop();
  });

  $("#sellall").click(function () {
    money += logPrice * logs;
    logs = 0;
    changeInventory();
    changeShop();
  });

  $("#autoCutShop").click(function () {
    if (money >= autoCutPrice) {
      autoLogPlus++;
      money -= autoCutPrice;
      autoCutPrice = changeCutPrice(autoCutPrice);
      $("#autoCutShop").html("Buy [1] Auto Cut ($ " + autoCutPrice + " )");
      changeInventory();
      changeShop();
    }
  });

  function changeCutPrice(price) {
    return Math.round(price * 1.15).toFixed(2);
  }

  $("#buyPickaxe").click(function () {
    if (money >= pickaxePrice) {
      logPlus++;
      pickaxe++;
      money -= pickaxePrice;
      pickaxePrice = changeCutPrice(pickaxePrice);
      $("#buyPickaxe").html("Buy Pickaxe ($ " + pickaxePrice + " )");
      changeInventory();
      changeShop();
    }
  });

  $("#return").click(function () {
    menu = switchMenu("main");
  });

  function changeInventory() {
    $("#money").html("Money: $" + money);
    if (logs == 1) {
      $("#logs").html("You now own " + logs + " log.");
    } else {
      $("#logs").html("You now own " + logs + " logs.");
    }
    if (autoLogPlus > 0) {
      $("#autoCut").css("display", "block");
      if (autoLogPlus == 1) {
        $("#autoCut").html("Your AutoCut " + autoLogPlus + " log/s");
      } else {
        $("#autoCut").html("Your AutoCut " + autoLogPlus + " logs/s");
      }
    } else {
      $("#autoCut").css("display", "none");
    }
    if (pickaxe > 1) {
      $("#pickPower").css("display", "block");
      if (pickaxe == 1) {
        $("#pickPower").html("Your Pickaxe Power: " + pickaxe);
      } else {
        $("#pickPower").html("Your Pickaxe Power: " + pickaxe);
      }
    } else {
      $("#pickPower").css("display", "none");
    }
    if (stones > 0) {
      $("#stones").html("You mine: " + stones + " Stones");
    }
  }

  function changeShop() {
    if (logs > 0) {
      //displayVisible(sellall);
      $("#sellall").css("display", "block");
    } else {
      $("#sellall").css("display", "none");
    }
    if (logs >= 1) {
      $("#sell1").css("display", "block");
    } else {
      $("#sell1").css("display", "none");
    }
    if (logs >= 10) {
      $("#sell10").css("display", "block");
    } else {
      $("#sell10").css("display", "none");
    }
  }

  function displayVisible(nameof) {
    //$("#" + nameof).css("display", "block");
    return;
  }

  function switchMenu(menu) {
    $(".menus").children().css("display", "none");
    $("." + menu).css("display", "block");
    return menu;
  }
});
