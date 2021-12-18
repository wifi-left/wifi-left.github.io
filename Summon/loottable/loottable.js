window.onbeforeunload = function(e) {
        return "当前内容不会被保存！The current content won't be saved!";
    }
    //Loading
$(function() {
    $('.toolSlide li').eq(0).show().css('opacity', 1);
    loottableGName();
    mitCache.load();
});

function loottableGName() {
    let ltn = $('#gLName').val() || '';
    $('#LPathShow').text(ltn);
    if (!ltn) {
        $('#LPathShowBox').css('color', 'rgb(255,50,0)');
        $('#LNBTUse').html('');
        return;
    }

    $('#stepWrong').hide();
    $('#LPathShowBox').css('color', 'rgb(0,180,0)');
    $('#LNBTUse').html(`/setblock ~ ~ ~ chest 0 replace {LootTable:"MLT:${ltn}"}
/summon zombie ~ ~ ~ {DeathLootTable:"MLT:${ltn}"}`);
    $('#jsonName').html(ltn + '.json');
}

function doSlide(nowStep, nextStep, force) {
    let ltn = $('#gLName').val() || '';
    if (!ltn && !force && nowStep == 0) {
        $('#stepWrong').show('inline-block');
        setTimeout(() => { $('#stepWrong').hide(); }, 3000);
        return;
    }

    $('.toolSlide li').eq(nowStep).show().css({
        opacity: 0,
        display: 'none'
    });
    nowStep += nextStep;
    $('.toolSlide li').eq(nowStep).show().css({
        opacity: 1,
        display: 'block'
    });
}

//Roll添加与删除
var rollID = 0;
var rollUUID = 0;

function newRoll() {
    rollID += 1;
    rollUUID += 1;
    var addText = document.createElement("div");
    addText.className = 'mlt-roll';
    addText.innerHTML = `<table class="gl-tab"><tbody>
		<tr><td><h3>Roll</h3></td><td><button class="btn danger button-red" onclick="removeRoll(this);">移除</button></td></tr>
		<tr><td><span title="决定了roll的最大和最小次数">*Rolls:</span></td><td><input class="input sho" type="text" id="rollMin" name="rollMin" placeholder="最小次数" maxlength="7" /> <input class="input sho" type="text" id="rollMax" name="rollMax" placeholder="最大次数" maxlength="7" /></td><td><span title="决定了每点幸运增加多少次roll的范围，计算后会向下舍入">Bonus_Rolls:</span></td><td><input class="input sho" type="text" id="BRollMin" name="BRollMin" placeholder="最小次数" maxlength="7" /> <input class="input sho" type="text" id="BRollMax" name="BRollMax" placeholder="最大次数" maxlength="7" /></td></tr>
		<tr><td><h3>Entries</h3></td><td><button class="btn button-blue" onclick="addEntries(this);">添加新Entries</button></td></tr>
	</tbody></table><div class="mlt-entries"></div><br/><hr/>`;
    document.getElementById("rollAdd").appendChild(addText);
}

function removeRoll(RemoveID) {
    var epath = RemoveID.parentNode.parentNode.parentNode.parentNode.parentNode;
    document.getElementById("rollAdd").removeChild(epath);
    rollID -= 1;
}

function addEntries(obj) {
    var gpath = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    var putpath = gpath.querySelector('.mlt-entries');
    var addObj = document.createElement("table");
    addObj.className = 'mlt-entry gl-tab';
    addObj.innerHTML = '<tbody><tr><td><span title="条目的种类">*类型:</span></td><td><select id="entriesType" name="entriesType" class="input"><option value="item">物品</option><option value="loot_table">战利品表</option><option value="empty">空</option></select></td><td><span title="如果是物品，填物品英文ID；如果是战利品表，则填战利品表的位置">*Name:</span></td><td><input class="input" type="text" id="entriesName" name="entriesName" placeholder="必填" maxlength="32" /></td></tr><tr><td><span title="决定被选择的权重，这个值越高则越容易被选中">*权重:</span></td><td><input class="input" type="text" id="entriesWeight" name="entriesWeight" placeholder="必填" maxlength="7" /></td><td><span title="基于玩家的幸运修改weight，公式：floor(weight+quality*generic.luck)">Quality:</span></td><td><input class="input" type="text" id="entriesQuality" name="entriesQuality" placeholder="选填" maxlength="7" /></td></tr><tr><td><span title="决定物品的NBT标签">NBT:</span></td><td><textarea id="entriesNBT" class="input" name="entriesNBT" rows="3" cols="30" onclick="ItemSet(this);"></textarea></td><td><span title="决定了对这个物品进行的特殊举动。如果没有被设置则不会被使用">Functions:</span></td><td><textarea id="entriesFunction" class="input" name="entriesFunction" rows="3" cols="30" onclick="FunctionSet(this);"></textarea></td><td><button class="btn danger button-red" onclick="removeEntry(this);">移除</button></td></tr></tbody>';
    putpath.appendChild(addObj);
}

function removeEntry(obj) {
    var epath = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    var rpath = obj.parentNode.parentNode.parentNode.parentNode;
    epath.removeChild(rpath);
}

//物品附魔添加与删除
var EnchID = 0;

function newEnch() {
    EnchID += 1;
    var addText = document.createElement("tbody");
    addText.innerHTML = '<tr><td><span class="pText">附魔ID: </span></td><td><select id="enchID" name="enchID"><option value="0">防御</option><option value="1">火焰保护</option><option value="2">掉落保护</option><option value="3">爆炸防御</option><option value="4">远程攻击防御</option><option value="5">水下呼吸</option><option value="6">水下挖掘</option><option value="7">荆棘</option><option value="8">深海探索者</option><option value="9">冰霜行者</option><option value="10">绑定诅咒</option><option value="16">锋利</option><option value="17">亡灵杀手</option><option value="18">截肢杀手</option><option value="19">击退</option><option value="20">火焰附加</option><option value="21">抢夺</option><option value="22">横扫之刃</option><option value="32">挖掘效率</option><option value="33">精准采集</option><option value="34">耐久</option><option value="35">时运</option><option value="48">力量</option><option value="49">弓箭击退</option><option value="50">火矢</option><option value="51">无限弓箭</option><option value="61">海之眷顾</option><option value="62">饵钓</option><option value="70">修复</option><option value="71">消失诅咒</option></select></td><td><span class="pText">附魔等级: </span></td><td><input class="input" type="text" id="enchLvl" name="enchLvl" placeholder="Levels" value="32767" maxlength="5" /><span id="tip">Max:32767</span><p id="rebutton" name="rebutton" onclick="removeEnch(this);">移除</p></td></tr>';
    document.getElementById("enchAdd").appendChild(addText);
}

function removeEnch(REnchID) {
    var epath = REnchID.parentNode.parentNode.parentNode;
    document.getElementById("enchAdd").removeChild(epath);
    EnchID -= 1;
}

//物品属性添加与删除
var AMID = 0;

function newAM() {
    AMID += 1;
    var NumUUID = "";
    for (var i = 0; i < 15; i++) { NumUUID += Math.floor(Math.random() * 10); }
    NumUUID = "1" + String(NumUUID);
    var addText = document.createElement("tbody");
    addText.innerHTML = '<tr><td><span class="pText">属性: </span></td><td><select id="AMAName" name="AMAName"><option value="generic.attackDamage">攻击</option><option value="generic.attackSpeed">攻击速度</option><option value="generic.maxHealth">最大生命</option><option value="generic.movementSpeed">移动速度</option><option value="generic.knockbackResistance">抗击退</option><option value="generic.followRange">仇恨跟踪</option><option value="generic.luck">幸运</option><option value="generic.armor">护甲</option><option value="generic.armorToughness">护甲韧性</option></select></td><td><span class="pText">属性名称: </span></td><td><input class="input" type="text" id="AMName" name="AMName" placeholder="语言不限" value="noName" maxlength="32" /></td></tr><tr><td><span class="pText">数值: </span></td><td><input class="input" type="text" id="AMAmount" name="AMAmount" placeholder="受Operation影响" value="0.2" maxlength="32" /></td><td><span class="pText">Operation: </span></td><td><select id="AMO" name="AMO"><option value="0">数值</option><option value="1">百分比</option></select></td></tr><tr><td><span class="pText">生效格: </span></td><td><select id="AMSlot" name="AMSlot"><option value="all">全部</option><option value="mainhand">主手</option><option value="offhand">副手</option><option value="feet">脚</option><option value="legs">腿</option><option value="chest">胸部</option><option value="head">头部</option></select></td><td><p id="rebutton" name="rebutton" onclick="removeAM(this);">移除</p></td><td><input class="input" style="display:none;" type="text" name="gNUUIDM" value="' + NumUUID + '"><input class="input" style="display:none;" type="text" name="gNUUIDL" value="' + NumUUID + '"></td></tr>';
    document.getElementById("AMAdd").appendChild(addText);
}

function removeAM(RAMID) {
    var epath = RAMID.parentNode.parentNode.parentNode;
    document.getElementById("AMAdd").removeChild(epath);
    AMID -= 1;
}

//物品可破坏添加与删除
var CanDID = 0;

function newCanD() {
    CanDID += 1;
    var addText = document.createElement("tbody");
    addText.innerHTML = '<tr><td><span class="pText">方块名: </span></td><td><input class="input" type="text" id="CanDBlock" name="CanDBlock" placeholder="方块ID" value="wool" maxlength="32" /><p id="rebutton" name="rebutton" onclick="removeCanD(this);" style="margin-left:8px;">移除</p></td></tr>';
    document.getElementById("CanDAdd").appendChild(addText);
}

function removeCanD(RCanDID) {
    var epath = RCanDID.parentNode.parentNode.parentNode;
    document.getElementById("CanDAdd").removeChild(epath);
    CanDID -= 1;
}

//物品可放置添加与删除
var CanPID = 0;

function newCanP() {
    CanPID += 1;
    var addText = document.createElement("tbody");
    addText.innerHTML = '<tr><td><span class="pText">方块名: </span></td><td><input class="input" type="text" id="CanPBlock" name="CanPBlock" placeholder="方块ID" value="wool" maxlength="32" /><p id="rebutton" name="rebutton" onclick="removeCanP(this);" style="margin-left:8px;">移除</p></td></tr>';
    document.getElementById("CanPAdd").appendChild(addText);
}

function removeCanP(RCanPID) {
    var epath = RCanPID.parentNode.parentNode.parentNode;
    document.getElementById("CanPAdd").removeChild(epath);
    CanPID -= 1;
}

var ISetPath;

function ItemSet(path) {
    ISetPath = path;
    var INBTH;
    if (window.innerHeight) { INBTH = window.innerHeight; } else if ((document.body) && (document.body.clientHeight)) { INBTH = document.body.clientHeight; }
    //if (parseInt("600") > parseInt(INBTH)) {INBTH = 600;alert(INBTH);}
    document.getElementById("gItemsNBT").style.height = INBTH + "px";
}

function INBTRsult(actDo) {
    var INBTdisplay = "wrong";
    var INBTench = "wrong";
    var INBTAM = "wrong";
    var INBTCanD = "wrong";
    var INBTCanP = "wrong";
    var taxINBT = "wrong";
    if (document.getElementById("gItemsName").value) {
        var INBT_name = document.getElementById("gItemsName").value;
        INBTdisplay += ',Name:"' + INBT_name + '"';
    }
    if (document.getElementById("gItemsLore").value) {
        var INBT_lore = document.getElementById("gItemsLore").value;
        INBT_lore = INBT_lore.replace(/\n/gm, '","');
        INBTdisplay += ',Lore:["' + INBT_lore + '"]';
    }
    if (INBTdisplay != "wrong") {
        taxINBT += ',display:{' + INBTdisplay + '}';
    }
    if (document.getElementById("unbreak").checked == true) {
        taxINBT += ',Unbreakable:1b';
    }
    temp = document.getElementById("gItemsHide").value;
    if (temp != 0) { taxINBT += ',HideFlags:' + temp + 'b'; }

    if (EnchID != 0) {
        var enchs = new Array();
        for (var i = 0; i < EnchID; i++) {
            enchs[i] = new Array();
            enchs[i][0] = document.getElementsByName("enchID")[i].value;
            enchs[i][1] = document.getElementsByName("enchLvl")[i].value;
            INBTench += ',{id:' + enchs[i][0] + 's,lvl:' + enchs[i][1] + 's}';
        }
    }
    if (INBTench != "wrong") {
        var INBTench = ',ench:[' + INBTench + ']';
        taxINBT += INBTench;
    }

    if (AMID != 0) {
        var AMs = new Array();
        for (var i = 0; i < AMID; i++) {
            AMs[i] = new Array();
            AMs[i][0] = document.getElementsByName("AMAName")[i].value;
            AMs[i][1] = document.getElementsByName("AMName")[i].value;
            AMs[i][2] = document.getElementsByName("AMAmount")[i].value;
            AMs[i][3] = document.getElementsByName("AMO")[i].value;
            AMs[i][4] = document.getElementsByName("AMSlot")[i].value;
            AMs[i][5] = document.getElementsByName("gNUUIDM")[i].value;
            AMs[i][6] = document.getElementsByName("gNUUIDL")[i].value;
            var slotTemp = ',Slot:' + AMs[i][4];
            if (AMs[i][4] == "all") { slotTemp = ""; }
            INBTAM += ',{AttributeName:"' + AMs[i][0] + '",Name:"' + AMs[i][1] + '",Amount:' + AMs[i][2] + 'd,Operation:' + AMs[i][3] + ',UUIDMost:' + AMs[i][5] + 'L,UUIDLeast:' + AMs[i][6] + 'L' + slotTemp + '}';
        }
    }
    if (INBTAM != "wrong") {
        var INBTAM = ',AttributeModifiers:[' + INBTAM + ']';
        taxINBT += INBTAM;
    }

    if (CanDID != 0) {
        var CanDs = new Array();
        for (var i = 0; i < CanDID; i++) {
            CanDs[i] = document.getElementsByName("CanDBlock")[i].value;
            INBTCanD += ',"' + CanDs[i] + '"';
        }
    }
    if (INBTCanD != "wrong") {
        var INBTCanD = ',CanDestroy:[' + INBTCanD + ']';
        taxINBT += INBTCanD;
    }

    if (CanPID != 0) {
        var CanPs = new Array();
        for (var i = 0; i < CanPID; i++) {
            CanPs[i] = document.getElementsByName("CanPBlock")[i].value;
            INBTCanP += ',"' + CanPs[i] + '"';
        }
    }
    if (INBTCanP != "wrong") {
        var INBTCanP = ',CanPlaceOn:[' + INBTCanP + ']';
        taxINBT += INBTCanP;
    }

    if (taxINBT != "wrong") {
        taxINBT = JSON.stringify('{' + taxINBT.replace(/wrong,/gm, "") + '}');
        taxINBT = taxINBT.replace(/\\\\u/gm, '\\u');
        ISetPath.value = ',{"function":"minecraft:set_nbt","tag":' + taxINBT + '}';
    }

    if (actDo == "clearNBT") { ISetPath.value = ''; }
    document.getElementById("gItemsNBT").style.height = "0px";
}

var FSetPath;

function FunctionSet(path) {
    FSetPath = path;
    document.getElementById("gFunctions").style.width = "760px";
}

function FunctionsRsult(actDo) {
    var FRs = new Array();
    FRs[0] = document.getElementById("countMin").value;
    FRs[1] = document.getElementById("countMax").value;
    FRs[2] = document.getElementById("damageMin").value;
    FRs[3] = document.getElementById("damageMax").value;
    FRs[4] = document.getElementById("dataMin").value;
    FRs[5] = document.getElementById("dataMax").value;
    FRs[6] = document.getElementById("LElimit").value;
    FRs[7] = document.getElementById("LEcount").value;
    if (FRs[0] && FRs[1]) { var FRcount = ',{"function":"minecraft:set_count","count":{"min":' + FRs[0] + ',"max":' + FRs[1] + '}}'; } else { var FRcount = ""; }
    if (FRs[2] && FRs[3]) { var FRdamage = ',{"function":"minecraft:set_damage","damage":{"min":' + FRs[2] + ',"max":' + FRs[3] + '}}'; } else { var FRdamage = ""; }
    if (FRs[4] && FRs[5]) { var FRdata = ',{"function":"minecraft:set_data","data":{"min":' + FRs[4] + ',"max":' + FRs[5] + '}}'; } else { var FRdata = ""; }
    if (FRs[6] && FRs[7]) { var FRLE = ',{"function":"minecraft:looting_enchant","limit":' + FRs[6] + ',"count":' + FRs[7] + '}'; } else { var FRLE = ""; }
    var FResult = FRcount + FRdamage + FRdata + FRLE;
    FSetPath.value = FResult;
    if (actDo == "clearNBT") { FSetPath.value = ''; }
    document.getElementById("gFunctions").style.width = "0px";
}

function getOutput() {
    var thisResult = "wrong";
    var obj_rolls = document.querySelector('#rollAdd').querySelectorAll('.mlt-roll');
    var roolnum = obj_rolls.length;
    if (roolnum > 0) {
        var Rolls = new Array();
        for (var i = 0; i < roolnum; i++) {
            Rolls[i] = new Array();
            Rolls[i][0] = obj_rolls[i].querySelector("#rollMin").value;
            Rolls[i][1] = obj_rolls[i].querySelector("#rollMax").value;
            Rolls[i][2] = obj_rolls[i].querySelector("#BRollMin").value;
            Rolls[i][3] = obj_rolls[i].querySelector("#BRollMax").value;
            var obj_entries = obj_rolls[i].querySelector('.mlt-entries').querySelectorAll('.mlt-entry');
            var entrynum = obj_entries.length;
            var entry = '';
            if (entrynum > 0) {
                entry = 'wrong';
                for (var e = 0; e < entrynum; e++) {
                    Rolls[i][4] = obj_entries[e].querySelector("#entriesType").value || "";
                    Rolls[i][5] = obj_entries[e].querySelector("#entriesName").value || "";
                    Rolls[i][6] = obj_entries[e].querySelector("#entriesWeight").value || "";
                    Rolls[i][7] = obj_entries[e].querySelector("#entriesQuality").value || "";
                    Rolls[i][8] = obj_entries[e].querySelector("#entriesNBT").value || "";
                    Rolls[i][9] = obj_entries[e].querySelector("#entriesFunction").value || "";
                    if (Rolls[i][7]) { var quality = ',"quality":' + Rolls[i][7]; } else { var quality = ""; }
                    var getFunctions = ',"functions":[wrong';
                    if (Rolls[i][8] || Rolls[i][9]) { getFunctions += Rolls[i][8] + Rolls[i][9] + ']'; } else { getFunctions = ""; }
                    entry += ',{"type":"' + Rolls[i][4] + '","name":"' + Rolls[i][5] + '","weight":' + Rolls[i][6] + quality + getFunctions + '}';
                }
            }
            if (Rolls[i][2] && Rolls[i][3]) { var bonus_rolls = ',"bonus_rolls":{"min":' + Rolls[i][2] + ',"max":' + Rolls[i][3] + '}' } else { var bonus_rolls = ""; }
            thisResult += ',{"rolls":{"min":' + Rolls[i][0] + ',"max":' + Rolls[i][1] + '}' + bonus_rolls + ',"entries":[' + entry + ']}';
        }
    }
    if (thisResult != "wrong") {
        thisResult = '{"pools":[' + thisResult.replace(/wrong,/gm, "") + ']}';
        localStorage.setItem("gxz_loottable", thisResult.replace(/wrong,/gm, ""));
    } else { thisResult = '随机池里什么都没有哦！'; }
    document.getElementById("cOutput").value = thisResult;
}

//转为unicode编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 缓存控制
let mitCache = {
    data: '',
    load: function() {
        this.data = $.storage.get('gxz_loottable');
        if (!this.data) { return false; }

        $('#cOutput').val(this.data);
        $.ui.alert({ title: "♻️ 上次缓存已载入", type: 'alert', buttons: false });
        doSlide(0, 2, true);
    },
    clear: function() {
        if (!this.data) {
            $.ui.alert({ title: "❌ 当前没有缓存", type: 'alert', buttons: false });
            return false;
        }

        this.data = '';
        $.storage.remove('gxz_loottable');
        $.ui.alert({ title: "♻️ 当前缓存已清除", type: 'alert', buttons: false });
    }
};