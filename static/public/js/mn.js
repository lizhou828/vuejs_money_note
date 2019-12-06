function addItem() {
}

function deleteItem(){
    if(window.confirm("你确定删除该笔记账吗?")){
        console.info("删除中。。。。");
        var itemId = $("#itemId").val();
        var noteDate = $("#noteDate").val();
        console.info("itemId ="+itemId +",noteDate ="+noteDate );
        $.ajax({
            url:"/mnItem/delete",
            type:"post",
            data:{"itemId":itemId},
            success:function(data){
                if("success" == data.result  ){
                    window.location.href = "/mnItem/dayList?day=" + noteDate;
                }else {
                    alert("删除失败,服务器繁忙!");
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("删除失败!");
                console.log("textStatus="+textStatus+",errorThrown="+errorThrown);
            }
        })
    }else{
        console.info("没删除");
    }
}

function saveItem() {
    var itemName = $("#itemName").val();
    if(itemName  == null || "" == itemName || typeof itemName == 'undefined' || "" == itemName.trim()){
        alert("请输入名称!");
        return;
    }

    var mnItem_money = $("#mnItem_money").val();
    var doubleReg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
    if (!doubleReg.test(mnItem_money)) {
        alert("请输入合法金额!");
        return;
    }

    var sonCateId =  $("#sonCate").val();
    console.info(sonCateId+","+typeof  sonCateId);
    if(sonCateId == null || sonCateId == '' || typeof  sonCateId == 'undefined' || "0" === sonCateId || "--请选择--" == sonCateId){
        alert("请选择类别!");
        return;
    }

    $("#addItemToday").attr("disabled",true);
    $("#addItemToday").submit();
    //window.location.href = "/helloWorld";

}



function saveEvent() {
    var eventName = $("#eventName").val();
    if(eventName  == null || "" == eventName || typeof eventName == 'undefined' || "" == eventName.trim()){
        alert("请输入名称!");
        return;
    }

    $("#addEvent").attr("disabled",true);
    $("#addEvent").submit();
    //window.location.href = "/helloWorld";
}



function deleteEvent(){
    if(window.confirm("你确定删除该事件吗?")){
        // console.info("删除中。。。。");
        var eventId = $("#eventId").val();
        console.info("eventId ="+eventId );
        $.ajax({
            url:"/mnEvent/delete",
            type:"post",
            data:{"id":eventId},
            success:function(data){
                // console.info("返回数据：data=" + data);
                if("success" == data.result  ){
                    window.location.href = "/mnEvent/list";
                }else {
                    alert("删除失败,服务器繁忙!");
                }

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("删除失败!");
                console.log("textStatus="+textStatus+",errorThrown="+errorThrown);
            }
        })
    }else{
        // console.info("没删除");
    }
}

