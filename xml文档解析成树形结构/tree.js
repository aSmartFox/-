//建立XMLdom对象,file为xml的文本路径
function loadXMLDoc(file) 
{
    var xmlDoc;
    try //Internet Explorer  
    {  
     xmlDoc=new ActiveXObject("Microsoft.XMLDOM");  
     xmlDoc.async=false;  
     xmlDoc.load(file);  
    }  
    catch(e)  
    {  
     try //Firefox, Mozilla, Opera, etc.  
     {  
      xmlDoc=document.implementation.createDocument("","",null);  
      xmlDoc.async=false;  
      xmlDoc.load(file);  
     }  
     catch(e)  
     {  
      try //Google Chrome  
      {  
       var xmlhttp = new window.XMLHttpRequest();  
       xmlhttp.open("GET",file,false);  
       xmlhttp.send(null);  
       xmlDoc = xmlhttp.responseXML;   //返回的是xml对象
      }  
      catch(e)  
      {  
       error=e.message;  
      }  
     }  
    } 
return xmlDoc;    
}

//返回树形结构的HTML代码，参数node为节点名,level为当前节点相对于根节点的深度值
function BuilderTree(nodeName,level)
{
	//子菜单项，缩进的像素数
	var indent=10;
	var temp="";
	level=level==null ? 0 : level;
    //得到子节点列表
	var nodes=nodeName.children;
   // console.log(nodes);

	for(var i=0;i<nodes.length;i++)
	{
		//当该节点没下级节点时
		if(nodes[i].children.length<1)
		{
		//当前菜单的名称
		temp+="<div style='margin-left:"+level*indent+"px;cursor:pointer;''>";
		temp+="<b>-</b> ";
		//是否打开新窗口
        //通过名称获取属性的值getAttribute(); target='' or target='target="_blank"'
        
        // <a href='http://post.baidu.com/f?kw=%D6%DC%B1%CA%B3%A9' target='_blank'>
		var target=nodes[i].getAttribute("target")==null ? "" : "target='"+nodes[i].getAttribute("target")+"'";
		temp+="<a href='"+nodes[i].getAttribute("url")+"' "+target+">"+nodes[i].getAttribute("name")+"</a>";
		temp+="</div>";
        //这个continue用的真是好
		continue;
		}
		//当前菜单的名称
		temp+="<div style='margin-left:"+level*indent+"px;cursor:pointer;' onclick='show(this)'>";
		temp+="<b>+</b> <b>"+nodes[i].getAttribute("name")+"</b>";
		temp+="</div>";          
		//当前菜单的下级内容
		temp+="<div style='margin-left:"+indent+"px;cursor:pointer;display:none'>";
		temp+=BuilderTree(nodes[i],level+1);
		temp+="</div>";
	}
   // console.log(temp);
	return temp;
}

//操作某个节点的下一节点nextSibling是否显示；
function show(obj)
{
	//当前节点的下一节点（同一级树）对象
	var nextNode=obj.nextSibling;
    console.log(obj);
    console.log(nextNode);
    
	//当前节点的头部符号节点，就是菜单项前面+、-号
	var subNode=obj.firstChild.firstChild;
    
    //元素节点1，属性节点2，文本节点3
	if(nextNode.nodeType==1)
	{
        
        //eval函数传入字符串，则会它会把字符串当成JavaScript代码进行编译
        //传入对象，直接返回
		with(eval(nextNode))
		{
            //如果是显示的，点击之后隐藏
			 if(style.display=="")
			 {
			  style.display="none";
			  subNode.nodeValue="+";
			 }
             //如果是隐藏的，点击之后显示
             else
			 {
			  style.display="";
			  subNode.nodeValue="-";
			 }
		}
	}
}