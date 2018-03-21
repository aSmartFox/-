// JavaScript Document  
var zNodes;//栏目树json格式字符串  
var setting = {  
    view: {  
        dblClickExpand: false,//双击节点名称展开（收起）节点  
        showLine: true,//显示连接线  
        selectedMulti: false//是否支持多选（按ctrl键）  
    },  
    data: {  
        simpleData: {  
            enable:true,  
            idKey: "id",//json串中节点ID的KEY  
            pIdKey: "pid",//json串中父节点ID的KEY  
        }  
    },  
    callback: {  
        /* 
        点击节点触发的事件 
        */  
        onClick: function(event, treeId,treeNode) { 
           // console.log(event,treeId,treeNode.data);
           /*  var data = treeNode.data;
            var data_str = ""; 
            for( var key in data)
            {
                data_str += key+":"+data[key]+".<br>"
            }
           $("#nodeIframe").html(data_str) */
           
          // console.log("treeObj",treeNode.children);
           
        var data_str = ""; 
           //递归遍历当前节点，返回字符串
         data_str = getChildrenData(treeNode,1);
         $("#nodeIframe").html(data_str)
        }  
    }  
};  
  
function getChildrenData(treeNode,level)
{
    var indent=20;
    var dataStr="<div style='margin-left:"+level*indent+"px'>"+"<b>"+treeNode.name+"</b>"+":&nbsp";
    var data = treeNode.data;
    for( var key in data)
    {
        dataStr += key+"&nbsp:&nbsp"+data[key]+"&nbsp;&nbsp;&nbsp;";
    }
    dataStr += "<br>";
    //获取所有的孩子(不论是有孩子的节点还是没有孩子的节点)
    var chiledNodes=treeNode.children;    
            
    if (!treeNode.isParent){
        dataStr +="</div>";
        return dataStr       
    }
    else{
        
        for (var i= 0; i<chiledNodes.length; i++){
            dataStr += getChildrenData(chiledNodes[i],level);
        }
        dataStr +="</div>";
        return dataStr;
    }
}
  
  
  
  
  
  
  //这里的rootNode 为xml的根节点，level为树的层级，初识为1
function BuildZnodes(rootNode,myId,pID){
      var zNodes=[];
      //这里又得到疑问，如果属性不添加在下面的数据里，将来如何得到属性
      // zNodes.push({id:myId,pid:pID,name:rootNode.getAttribute('name')});
     
     
     
     
     /*  得到rootNode的属性节点,属性节点的对象为NamedNodeMap,因为它是动态的对象，引发了一些错误，Maximum call stack size exceeded */
      var attrNode=rootNode.attributes;
     
     //console.log("节点类型：",rootNode.nodeType);这表明所有遍历的都是元素节点。
     
     
     
     /* 将 NamedNodeMap类型的attrNode转化为map类型的data*/
      var data={};
      
     for(var i=0;i<attrNode.length;i++){
          data[attrNode.item(i).name]=attrNode.item(i).value;      
      }  
      
      //之所以大于1，取巧，是因为有些节点的文本存在特殊字符，只占一个长度;
      if(rootNode.firstChild && (rootNode.firstChild.nodeType==3) && (rootNode.firstChild.nodeValue).length>1){
       // console.log(rootNode.nodeName,"文本节点：",rootNode.firstChild,rootNode.firstChild.nodeValue);
       data["text_str"]=rootNode.firstChild.nodeValue;
     }
     
     
     // console.info("data",data);
    
      
      
     //一进入当前节点，就把当前节点的数据放入zNodes
       zNodes.push({id:myId,pid:pID,name:rootNode.nodeName,data:data});
     
     
      //得到rootNode的子节点列表(表示元素节点：1)
      var childrenNodeList = rootNode.children;
      
     
     //获取子节点列表的长度
      var list_length = childrenNodeList.length;
     
     //当前节点没有子节点，返回数据
      if(list_length<1){
       
        return  zNodes;  
      }
      
      //有子节点，
      else{
     
           //依次访问子节点
          for(var i=0;i<list_length;i++){                  
              
             //递归得到子节点的数据                         
              zNodes=zNodes.concat(BuildZnodes(childrenNodeList[i],myId*10+i+1,myId));                                      
          }
          
          //返回子节点所有数据
          return zNodes; 
      }
      
     
      
}
$(document).ready(function(){   
    $.post(  
        "result.xml",  
        function(data){  
            //这个表明可以将menu.xml读入，data是一个对象； 
            // console.log("打印data:",data); 
            var rootNode=data.documentElement;
            
            //打印的根节点对象
            //  console.log("rootNode:",rootNode);
            var zNodes=BuildZnodes(rootNode,1,0);
           
            console.log("全部数据:",zNodes);
            $.fn.zTree.init($("#tree"), setting, zNodes);
            
            //加载栏目树，jQuery.parseJSON(zNodes)将json格式字符串转换为json对象  
              
        },"xml"
        );  
});  