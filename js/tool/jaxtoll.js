var EX = jQuery;
(function($){
//do something here;
 	$.ajaxTollPshare={
		getPostSummary:function(jon){
			var array = new Array();
			var reStr="";
			for(var key in jon){
					array.push(key);
			}
			//排序
//			for(var i=0;i<array.length;i++){
//				for(var j=0;j<array.length;j++){
//					if(array[j]>array[i]){
//						var temp=array[j];
//      					array[j]=array[i];
//      					array[i]=temp;	
//					}						
//				}
//			}
			array.sort();
			for(var l in array){
				var key = array[l];
				reStr += jon[key];
			}
			console.log(reStr);
			return $.md5(reStr+jsonUrl.key);
		//console.log(getStr(jon));
		},
 		/**
 		*post协议
 		*/
 		commenPost:function(urlPort,param){
 			var summary = this.getPostSummary(param);
 			param.summary = summary;
 			var da = null;
			$.ajax( {  
			  url:urlPort,// 跳转到 action  
			  data:param,  
			  async:false,
			  type:'post',  
			  cache:false,  
			  dataType:'json',  
			  success:function(data) { 
			 	da = data;
				}
			});
			 return da;
 		},
 		/**
 		*get协议
 		*/
 		commenGet:function(urlPort){
 			var da=null;
 			var summary = null;
			$.ajax( {  
			  url:urlPort,// 跳转到 action   
			  async:false,
			  type:'get',  
			  cache:false,  
			  dataType:'json',  
			  success:function(data) { 
				  da =  data;
				}
			});
			return da;
 		}		 
 	 
 	}

})(jQuery);