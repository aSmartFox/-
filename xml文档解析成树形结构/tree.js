//����XMLdom����,fileΪxml���ı�·��
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
       xmlDoc = xmlhttp.responseXML;   //���ص���xml����
      }  
      catch(e)  
      {  
       error=e.message;  
      }  
     }  
    } 
return xmlDoc;    
}

//�������νṹ��HTML���룬����nodeΪ�ڵ���,levelΪ��ǰ�ڵ�����ڸ��ڵ�����ֵ
function BuilderTree(nodeName,level)
{
	//�Ӳ˵��������������
	var indent=10;
	var temp="";
	level=level==null ? 0 : level;
    //�õ��ӽڵ��б�
	var nodes=nodeName.children;
   // console.log(nodes);

	for(var i=0;i<nodes.length;i++)
	{
		//���ýڵ�û�¼��ڵ�ʱ
		if(nodes[i].children.length<1)
		{
		//��ǰ�˵�������
		temp+="<div style='margin-left:"+level*indent+"px;cursor:pointer;''>";
		temp+="<b>-</b> ";
		//�Ƿ���´���
        //ͨ�����ƻ�ȡ���Ե�ֵgetAttribute(); target='' or target='target="_blank"'
        
        // <a href='http://post.baidu.com/f?kw=%D6%DC%B1%CA%B3%A9' target='_blank'>
		var target=nodes[i].getAttribute("target")==null ? "" : "target='"+nodes[i].getAttribute("target")+"'";
		temp+="<a href='"+nodes[i].getAttribute("url")+"' "+target+">"+nodes[i].getAttribute("name")+"</a>";
		temp+="</div>";
        //���continue�õ����Ǻ�
		continue;
		}
		//��ǰ�˵�������
		temp+="<div style='margin-left:"+level*indent+"px;cursor:pointer;' onclick='show(this)'>";
		temp+="<b>+</b> <b>"+nodes[i].getAttribute("name")+"</b>";
		temp+="</div>";          
		//��ǰ�˵����¼�����
		temp+="<div style='margin-left:"+indent+"px;cursor:pointer;display:none'>";
		temp+=BuilderTree(nodes[i],level+1);
		temp+="</div>";
	}
   // console.log(temp);
	return temp;
}

//����ĳ���ڵ����һ�ڵ�nextSibling�Ƿ���ʾ��
function show(obj)
{
	//��ǰ�ڵ����һ�ڵ㣨ͬһ����������
	var nextNode=obj.nextSibling;
    console.log(obj);
    console.log(nextNode);
    
	//��ǰ�ڵ��ͷ�����Žڵ㣬���ǲ˵���ǰ��+��-��
	var subNode=obj.firstChild.firstChild;
    
    //Ԫ�ؽڵ�1�����Խڵ�2���ı��ڵ�3
	if(nextNode.nodeType==1)
	{
        
        //eval���������ַ��������������ַ�������JavaScript������б���
        //�������ֱ�ӷ���
		with(eval(nextNode))
		{
            //�������ʾ�ģ����֮������
			 if(style.display=="")
			 {
			  style.display="none";
			  subNode.nodeValue="+";
			 }
             //��������صģ����֮����ʾ
             else
			 {
			  style.display="";
			  subNode.nodeValue="-";
			 }
		}
	}
}