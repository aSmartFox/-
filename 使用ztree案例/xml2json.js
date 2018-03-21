
function handlerClick(event,treeId,treeNode){
    console.log(event,treeId,treeNode["sex"]);
    $("#content").html(treeNode["sex"]);
    
}
    function handlerCheck(event,treeId,treeNodehandlerCheck){
    console.log(this);
}


    var setting = {
    data:{//表示tree的数据格式
        simpleData:{
            enable:true,//表示使用简单数据模式
            idKey:"id",//设置之后id为在简单数据模式中的父子节点关联的桥梁
            pidKey:"pId",//设置之后pid为在简单数据模式中的父子节点关联的桥梁和id互相对应
            rootId:"null"//pid为null的表示根节点,默认
        }
    },
    view:{//表示tree的显示状态
        selectMulti:false//表示禁止多选
    },
    check:{//表示tree的节点在点击时的相关设置
        enable:true,//是否显示radio/checkbox
        chkStyle:"checkbox",//值为checkbox或者radio表示
        checkboxType:{p:"",s:""},//表示父子节点的联动效果
        radioType:"level"//设置tree的分组
    },
    callback:{//表示tree的一些事件处理函数
        onClick:handlerClick,
        onCheck:handlerCheck
    }
} 

 
/*  
 * 遍历迭代xml节点  
 * childNodes 子节点集合  
 * hasChildren 是否有子节点  
 * id 节点ID值  
 * json 存储节点字符串  
 */  
function iterationNode(childNodes, hasChildren,pid, id, json){  
    if(hasChildren){  
         for( var i=0; childNodes!=null && i<childNodes.length; i++){  
              var node = childNodes[i];  
              json += "{\"id\":\""+id+"_"+i+"\","  
                    + "\"pId\":\""+pid+"\","  
                    + "\"name\":\""+node.getAttribute("name")+"\","  
                    + "\"open\":0,";
                   
            if(node.children!=null && node.children.length>0 ){  
                json += "\"isParent\":1},";  
                json = iterationNode(node.children, true, id+"_"+i, id+"_"+i, json);  
            }else{  
                json += "\"isParent\":0},";  
            }  
       }  
    }  
    return json;  
}  


$(function(){
$.ajax({  
        //请求方式为get  
        type: "POST",  
        //xml文件位置  
        url: "menu.xml",  
        //返回数据格式为xml  
        dataType: "xml",  
        //请求成功完成后要执行的方法  
        success: function (xml) {  
            //获取根节点的所有子节点列表(元素节点)
            var elements = xml.documentElement.children;  
            console.log("elements",elements.length);
            //保存tree数据  
            var json = "[";  
            //获取所需的数据  
            //for (var i = 0; i < elements.length; i++) {  
                //只取得lable=nearestNeighbourSearch的节点分支数据  
               // if("nearestNeighbourSearch" == elements[i].getAttribute("label")){  
                    json = iterationNode(elements, true, 0, 0,json);  
                     
                     
               // }  
           // } 
            json = json.substr(0,json.length-1) + "]";
            //console.log(json); 
            json = $.parseJSON(json);
            $.fn.zTree.init($("#des_school"),setting,json);
        }  
});
});   
