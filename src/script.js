
$(document).ready(function() 
{
	var change='';
	$("#aC").data('data-slide','');
	 $('#leftInd').tooltip("disable");
	loadFavourites();
	
//	$table.floatThead("getRowGroups");
//	alert("button:::"+$(".buttonClass"));
	
	
	
	
		
	
	
	
	
	
	
	
	
	
	
	
	$('#leftInd').click(function(){
	
	
    $("#myCarousel").carousel("next");
});

	$('#refresh').click(function ()
	{
		
		onlyChangeRefresh();
		
	});
	

	$('#autoRefresh').change(function()
	{
	
		 setInterval( function(){  if($('#autoRefresh').prop('checked')) onlyChangeRefresh();}, 5000);

	});
	
	
	$("#favourites").click(function () 
	{
		if (typeof(Storage) !== "undefined") 
		{
					// Store
					var newstr=$('#symbol').html();
				//	alert("clicked to add "+newstr);
					var oldstr=localStorage.getItem("symbol");
				//	alert('old String::'+oldstr);
					if(oldstr==null || oldstr.search(newstr)==-1)
					{
						if(oldstr==null || oldstr=='')
							oldstr=newstr;
						else
							oldstr=oldstr+","+newstr;
					//	alert('new String when insert::'+oldstr);
					//	alert('color is changing');
						$('#colorChange').css({"color":"yellow"});
					}
					else
					{
						if(oldstr!=null)
						{
						//	alert("replacing");
							oldstr=oldstr.replace(newstr,"");
							if(oldstr.endsWith(','))
								oldstr=oldstr.substring(0,str.length-1);
							oldstr=oldstr.replace(",,",",");
						//	alert("after replace"+oldstr);
							if(oldstr=="")
								oldstr=null;
						}
						$('#colorChange').css({"color":"white"});
					//	alert('new String when delete::'+oldstr);
					}
					localStorage.setItem("symbol",oldstr);
					
					loadFavourites();
					// Retrieve
					//document.getElementById("result").innerHTML = 
			}
			else {
						//document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
				}
	});
	
	
	
	
	$("#facebookShare").click(function () 
	{
		$.ajaxSetup({cache: true});
		$.getScript('//connect.facebook.net/en_US/sdk.js', function ()
		{
		FB.init
			({
				appId      : '996012853825860',
				xfbml      : true,
				version    : 'v2.5'

			});	
		FB.ui(
				{
					method: 'feed',		
					link: "http://dev.markitondemand.com/" ,
					name: 'Current Stock Price of '+$('#name').html() +' is '+$('#lastPrice').html() ,
					caption: 'LAST TRADE PRICE:$ ' + $('#lastPrice').html() + ',CHANGE:' + change ,
					description: 'Stock Information of ' + $('#name').html() + ' (' + $('#symbol').html() + ')' ,
					picture: 'http://chart.finance.yahoo.com/t?s=' + $('#symbol').html()  + '&lang=en-US&width=200&height=200'
				},
				 function(response)
				 {
					 if(response!=null)
						 alert("Posted Successfully");
					 else
						 alert("Not Posted");
					 
				 }
			);
		});
	});
		
		window.fbAsyncInit = function()
		{
			
		};	
			
 
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
	
	
	 $( "#companyName" ).autocomplete(
	{
		source: function( request, response )
		{
			$.ajax
			({
				url: "http://midyear-freedom-127906.appspot.com/bingSearch.php",
				
				data:
				{
					Symbol: $('#companyName').val()
				},
				success: function( data ) 
				{
					var array =[];
					//alert($('#companyName').val());
					var obj = $.parseJSON(data);
				//	alert(obj[1].Name);
					for (var i = 0; i < obj.length; i++)
					{
						 var name = obj[i].Name;
							var symbol = obj[i].Symbol;
								var exchange = obj[i].Exchange;
							var combinedHash = {};
							combinedHash["value"] = symbol;
							var combined = symbol + ' - ' + name + ' (' + exchange + ')';            
							combinedHash["label"] = combined;            
							array.push(combinedHash);
					}
					response(array);
				}
			});	
		}
	 });	
	
	 
//	 $("#getQuote").click(function() 
	 //{
		$('#stockForm').submit(function()
		{
		 
		 
		var symbol=$("#companyName").val();
		
	//	alert(symbol);
       $.ajax({
				type: "GET",
				url: "http://midyear-freedom-127906.appspot.com/bingSearch.php",
				data: 
				 {
 					 lookup : symbol
				 },
				success: function( data )
				{
		//			alert("before::"+data.stockValue);		
					ob=$.parseJSON(data.stockValue);
				//	alert(ob);
					if(!ob || ob.Message)
					{
						$("#messages").empty().append("<font color='#ff0000'> Select a valid entry");
						console.log("Select a valid entry");
						return false;
					}
					var success = ob.Status;
					console.log(success);
					if(success=="Failure" || success=="Failure|APP_SPECIFIC_ERROR"  || success=="APP_SPECIFIC_ERROR")
					{
						$("#messages").empty().append("<font color='red'> No stock information available");
						console.log("No stock information available");
						return false;
					}
					//search
				 	 $("#newsFeedsDialog").empty();
					
					var obj1 = $.parseJSON(data.search);
				
					
					for (var i = 0; i < obj1.d.results.length ; i++)
					{
						var result=obj1.d.results[i];
						var str="<div class='well'><a href='"+result.Url+"'>"+result.Title+"</a>";
						var regex=new RegExp(symbol,'g');
						var newDesc=(result.Description).replace(regex,"<b>"+symbol+"</b>");
						str+="<div style='margin-top:10px'>"+newDesc+"</div>"+
						"<div style='margin-top:10px;'><b> Publisher: "+result.Source+"</b></div>";
						myDate=new Date(result.Date);
						myDate=moment(myDate).format('DD MMM YYYY HH:mm:ss');
						str+="<div style='margin-top:10px;'><b> Date: "+myDate+"</b></div>"+"</div>"; 
						$("#newsFeedsDialog").append(str);
	
					}
					  
				 
					$("#leftInd").prop('disabled',false);
					var jsonData = $.parseJSON(data.chart);
				
					var cleanData=getOHLC(jsonData); 
					
					$('#chartContainer').highcharts('StockChart', 
					{
					

                     title: {
                                text: jsonData.Elements[0].Symbol +' Stock Value'
							},

					subtitle: 
							{
								text: ''
							},

					xAxis: {
								gapGridLineWidth: 0
							},
					yAxis: [{
								title:
								{
										text: "stock value"
								}
							}],

					rangeSelector : 
							{
									buttons : [{
													type : 'week',
													count : 1,
													text : '1w'
												},
												{
													type : 'month',
													count : 1,
													text : '1m'
												},
												{
													type : 'month',
													count : 3,
													text : '3m'
												},
												{
													type : 'month',
													count : 6,
													text : '6m'
												},
												{
													type : 'ytd',
													count : 1,
													text : 'YTD'
												},
												{
													type : 'year',
													count : 1,
													text : '1y'
												},
												{
													type : 'all',
													count : 1,
													text : 'All'
												}],
								selected : 0,
								inputEnabled : false
							},
					reflow: true,

					series : [{
												name : jsonData.Elements[0].Symbol ,
												type: 'area',
												data : cleanData,
												gapSize: 5,
												yAxis : 0,
												tooltip: 
												{
														valueDecimals: 2	
												},
												fillColor : 
												{
														linearGradient : {
																			x1: 0,
																			y1: 0,
																			x2: 0,	
																			y2: 1
																		
																		},
														stops : [
																	[0, Highcharts.getOptions().colors[0]],
																	[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
																]
												},
												threshold: null
									}]

					});
						
				obj1=$.parseJSON(data.stockValue);
				
				if (typeof(Storage) !== "undefined")
				{
						var oldstr=localStorage.getItem("symbol");
					//	alert(obj1.Symbol);
						if(oldstr!=null && oldstr.search(obj1.Symbol)!=-1)
					{
						//alert("prsent in "+oldstr);
								$('#colorChange').css({"color":"yellow"});
					}
					else
					{
					//	alert("not prsent in "+oldstr);
								$('#colorChange').css({"color":"white"});
					}
				}
				
				
		//		alert(obj1);
				var stockData= "<tr><td><b>Name</b></td><td id='name'>"+obj1.Name+"</td></tr>" +
					 "<tr><td><b>Symbol</b></td><td id='symbol'>"+obj1.Symbol+"</td></tr>" +
					 "<tr><td><b>Last Price</b></td><td id='lastPrice'>$"+obj1.LastPrice+"</td></tr>" +
					 "<tr><td><b>Change (Change Percent)</b></td><td id='change'>" ;
						change=obj1.Change.toFixed(2)+"("+obj1.ChangePercent.toFixed(2)+"%)";
						if(obj1.Change>0)
						{
							stockData+="<span class='greenFont'>"+obj1.Change.toFixed(2)+ "("+obj1.ChangePercent.toFixed(2) +"%)</span>";
							 stockData+="<img src='up.png' width=10px height=10px>";
						}
						else
						if(obj1.Change<0)
						{
							stockData+="<span class='redFont'>"+obj1.Change.toFixed(2)+ "("+obj1.ChangePercent.toFixed(2) +"%)</span>";
							 stockData+="<img src='down.png' width=10px height=10px>";
						}
						 stockData+="</td></tr>";
						
						
						var myDate=new Date(obj1.Timestamp);
						myDate=moment(myDate).format('DD MMMM YYYY, h:mm:ss a');
						stockData+= "<tr><td><b>Timestamp</b></td><td>"+myDate+"</td></tr>";
						stockData+= "<tr><td><b>MarketCap</b></td><td>";
						var marketCap = (obj1.MarketCap / 1000000).toFixed(2);
					//	tdId="#tdMarketCap"+symbol;
						if (marketCap < 0.005)
							stockData+= "" + marketCap; //none
						else 
						{
							marketCap = (marketCap / 1000).toFixed(2);
							if (marketCap < 0.005)
								stockData+= marketCap + " Million"; //million
							else
								stockData+= marketCap + " Billion"; //billion
						}

						stockData+="</td></tr>";
						stockData+= "<tr><td><b>Volume</b></td><td>"+obj1.Volume+"</td></tr>";
						var diff=obj1.LastPrice-obj1.ChangeYTD;
						stockData+= "<tr><td><b>Change YTD(Change Percent YTD)</b></td><td>";
						if(diff>0)
						{
							stockData+="<span class='greenFont'>" +diff.toFixed(2)+ "("+ obj1.ChangePercentYTD.toFixed(2) +"%)</span>";
							stockData+= "<img src='up.png' width=10px height=10px>";
						}
						else
						if(diff<0)
						{
							stockData+="<span class='redFont'>" +diff.toFixed(2)+ "("+obj1.ChangePercentYTD.toFixed(2) +"%)</span>";
							stockData+= "<img src='down.png' width=10px height=10px>";
						}
						stockData+= "</td></tr>"+
						 "<tr><td><b>High</b></td><td >$"+obj1.High+"</td></tr>"+
						 "<tr><td><b>Low</b></td><td >$"+obj1.Low+"</td></tr>"+
						 "<tr><td><b>Open</b></td><td >$"+obj1.Open+"</td></tr>";

						 
						 $("#tableData").empty().append(stockData);
						 
						 stockData="<img  src='http://chart.finance.yahoo.com/t?s="+obj1.Symbol+"&lang=en-US&width=400&height=300' width=100% height=90%>";
						 $("#yahooChart").empty().append(stockData); 
						 $("#myCarousel").carousel(1);
						  $('.nav-pills a[href="#currentStock"]').tab('show');
							 $("#leftInd").prop('disabled',false);
							 	  $('#leftInd').prop("title","Go to stock information");
				}		 
				
		});
		return false;
    });
	
	
});



fixDate = function(dateIn) {
    var dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
};


getOHLC=function(json)
{

    var dates = json.Dates || [];

    var elements = json.Elements || [];
    var chartSeries = [];

    if (elements[0])
	{

        for (var i = 0, datLen = dates.length; i < datLen; i++)
		{
            var dat = fixDate( dates[i] );
            var pointData = 
			[
                dat,
                elements[0].DataSeries['open'].values[i],
                elements[0].DataSeries['high'].values[i],
                elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
};


  $(function()
  {
    $('#toggle-event').change(function() 
	{
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
    })
  })
  
  
function loadFavourites()
{
	
	if (typeof(Storage) !== "undefined") 
	{
				
					var combinedSymbols=localStorage.getItem("symbol");
					if(combinedSymbols==null)
						return;
					arr = combinedSymbols.split(',');
					$('#stockD').empty();
					for(i=0; i < arr.length; i++)
					{
					//	alert(arr[i]);
						if(arr[i]==null || arr[i]=="")
						{
							continue;
						}
						//alert("arr[i]::"+arr[i]);			
						 $.ajax({
									type: "GET",
									url: "http://midyear-freedom-127906.appspot.com/bingSearch.php",
									data: 
									{
										lookup : arr[i]
									},
									success: function( data )
									{
									
										ob=$.parseJSON(data.stockValue);
									
										if(!ob || ob.Message)
										{
							//				$("#messages").empty().append("<font color='red'> Select a valid entry");
										//	console.log("Select a valid entry");
											return false;
										}
										var success = ob.Status;
										console.log(success);
										if(success=="Failure" || success=="Failure|APP_SPECIFIC_ERROR"  || success=="APP_SPECIFIC_ERROR")
										{
								//			$("#messages").empty().append("<font color='red'> No stock information available");
										//	console.log("No stock information available");
											return false;
										}
									
									//	alert(ob);
										var stockData= "<tr id='"+ob.Symbol+"Row' >"+
														"<td><a href='#' onclick='callBackThis(this.id)' id='"+ob.Symbol+"3' >"+ob.Symbol+'<a></td>'+
														"<td>"+ob.Name+"</td>"+
														"<td id='"+ob.Symbol+"1'>$"+ob.LastPrice +"</td>"+
														"<td id='"+ob.Symbol+"2'>";
														if(ob.Change>0)
														{
															stockData+="<span class='greenFont'>"+ ob.Change.toFixed(2)+"("+ob.ChangePercent.toFixed(2) +"%)</span>";
															stockData+="<img src='up.png' width=10px height=10px>";
														}
														else
														if(ob.Change<0)
														{
															stockData+="<span class='redFont'>"+ ob.Change.toFixed(2)+"("+ob.ChangePercent.toFixed(2) +"%)</span>";
															stockData+="<img src='down.png' width=10px height=10px>";
														}
														stockData+="</td><td>"
														var marketCap = (ob.MarketCap / 1000000).toFixed(2);
														//	tdId="#tdMarketCap"+symbol;
														if (marketCap < 0.005)
															stockData+= "" + marketCap; //none
														else 
														{
															marketCap = (marketCap / 1000).toFixed(2);
															if (marketCap < 0.005)
																stockData+= marketCap + " Million"; //million
															else
																stockData+= marketCap + " Billion"; //billion
														}
														stockData+="</td>";
														stockData+='<td><button class="btn buttonClass" onclick="refreshing(this.id)" id="'+ob.Symbol+'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td></tr>' ;	
														$('#stockD').append(stockData);
										
									}
								});			
						
						
					}
	}
}

function refreshing(str) 
	{
		
		//alert('clicked ');
		//alert("symbol:::"+str);
		var oldstr=localStorage.getItem("symbol");
		oldstr=oldstr.replace(str,"");	
		if(oldstr.endsWith(','))
								oldstr=oldstr.substring(0,str.length-1);
						
		oldstr=oldstr.replace(",,",",");
		if(oldstr.length==1)
			oldstr=null;
		localStorage.setItem("symbol",oldstr);
		//loadFavourites();
		
		var newSym=str+"Row";
		$('#'+newSym).remove();
			
		
	}

function onlyChangeRefresh()
{
		var combinedSymbols=localStorage.getItem("symbol");
		arr = combinedSymbols.split(',');
		for(i=0; i < arr.length; i++)
		{
			//			alert("arr[i]::"+arr[i]);			
						 $.ajax({
									type: "GET",
									url: "http://midyear-freedom-127906.appspot.com/bingSearch.php",
									data: 
									{
										lookup : arr[i]
									},
									success: function( data )
									{
										
								 					ob=$.parseJSON(data.stockValue);
				//									alert(ob);
													if(!ob || ob.Message)
													{
													
														return false;
													}			
													var success = ob.Status;
													console.log(success);
													if(success=="Failure" || success=="Failure|APP_SPECIFIC_ERROR"  || success=="APP_SPECIFIC_ERROR")
													{
													
														return false;
													}
		

										obj1=$.parseJSON(data.stockValue);
					//					alert(obj1);
									
										
										var stockData= "";
														if(obj1.Change>0)
														{
															stockData+="<span class='greenFont'>"+ obj1.Change.toFixed(2)+"("+obj1.ChangePercent.toFixed(2) +"%)</span>";
															stockData+="<img src='up.png' width=10px height=10px>";
														}
														else
														if(obj1.Change<0)
														{
															stockData+="<span class='redFont'>"+ obj1.Change.toFixed(2)+"("+obj1.ChangePercent.toFixed(2) +"%)</span>";
															stockData+="<img src='down.png' width=10px height=10px>";
														}
						//								alert("new::"+stockData);
														
														$('#'+obj1.Symbol+'1').empty().append("$"+obj1.LastPrice);
														$('#'+obj1.Symbol+'2').empty().append(stockData);
														
									}
								});			
						
						
					}
}
	

	
	
  function callBackThis(str)
  {
	  //alert(str);
		var symbol=str.substring(0,str.length-1);
		// alert(symbol);
       $.ajax({
				type: "GET",
				url: "http://midyear-freedom-127906.appspot.com/bingSearch.php",
				data: 
				 {
 					 lookup : symbol
				 },
				success: function( data )
				{
					
					ob=$.parseJSON(data.stockValue);
			//		alert(ob);
					if(!ob || ob.Message)
					{
						return false;
					}
					var success = ob.Status;
				
					if(success=="Failure" || success=="Failure|APP_SPECIFIC_ERROR"  || success=="APP_SPECIFIC_ERROR")
					{
						return false;
					}
							
					
					
					//search
				 	$("#newsFeedsDialog").empty();
					
					var obj1 = $.parseJSON(data.search);
				
					
					for (var i = 0; i < obj1.d.results.length ; i++)
					{
						var result=obj1.d.results[i];
						var str="<div class='well'><a href='"+result.Url+"'>"+result.Title+"</a>";
						var regex=new RegExp(symbol,'g');
						var newDesc=(result.Description).replace(regex,"<b>"+symbol+"</b>");
						str+="<div style='margin-top:10px'>"+newDesc+"</div>"+
						"<div style='margin-top:10px;'><b> Publisher: "+result.Source+"</b></div>";
						myDate=new Date(result.Date);
						myDate=moment(myDate).format('DD MMM YYYY HH:mm:ss');
					
						str+="<div style='margin-top:10px;'><b> Date: "+myDate+"</b></div>"+"</div>"; 
						$("#newsFeedsDialog").append(str);
	
					} 
					 
				 
					$("#leftInd").prop('disabled',false);
					var jsonData = $.parseJSON(data.chart);
				
					var cleanData=getOHLC(jsonData); 
					
					$('#chartContainer').highcharts('StockChart', 
					{
					
                     title: {
                                text: jsonData.Elements[0].Symbol +' Stock Value'
							},

					subtitle: 
							{
								text: ''
							},

					xAxis: {
								gapGridLineWidth: 0
							},
					yAxis: [{
								title:
								{
										text: "stock value"
								}
							}],


					rangeSelector : 
							{
									buttons : [{
													type : 'week',
													count : 1,
													text : '1w'
												},
												{
													type : 'month',
													count : 1,
													text : '1m'
												},
												{
													type : 'month',
													count : 3,
													text : '3m'
												},
												{
													type : 'month',
													count : 6,
													text : '6m'
												},
												{
													type : 'ytd',
													count : 1,
													text : 'YTD'
												},
												{
													type : 'year',
													count : 1,
													text : '1y'
												},
												{
													type : 'all',
													count : 1,
													text : 'All'
												}],
								selected : 0,
								inputEnabled : false
							},
					series : [{
												name : jsonData.Elements[0].Symbol ,
												type: 'area',
												data : cleanData,
												gapSize: 5,
												yAxis : 0,
												tooltip: 
												{
														valueDecimals: 2	
												},
												fillColor : 
												{
														linearGradient : {
																			x1: 0,
																			y1: 0,
																			x2: 0,	
																			y2: 1
																		
																		},
														stops : [
																	[0, Highcharts.getOptions().colors[0]],
																	[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
																]
												},
												threshold: null
									}]

					});
						
				
				obj1=$.parseJSON(data.stockValue);
				
				if (typeof(Storage) !== "undefined")
				{
						var oldstr=localStorage.getItem("symbol");
						if(oldstr!=null && oldstr.search(symbol)!=-1)
					{
								$('#colorChange').css({"color":"yellow"});
					}
					else
					{
								$('#colorChange').css({"color":"white"});
					}
					
				}
				
				
		//		alert(obj1);
				var stockData= "<tr><td><b>Name</b></td><td id='name'>"+obj1.Name+"</td></tr>" +
					 "<tr><td><b>Symbol</b></td><td id='symbol'>"+obj1.Symbol+"</td></tr>" +
					 "<tr><td><b>Last Price</b></td><td id='lastPrice'>$"+obj1.LastPrice+"</td></tr>" +
					 "<tr><td><b>Change (Change Percent)</b></td><td id='change'>" ;
						change=obj1.Change.toFixed(2)+"("+obj1.ChangePercent.toFixed(2)+"%)";
						if(obj1.Change>0)
						{
							stockData+="<span class='greenFont'>"+obj1.Change.toFixed(2)+ "("+obj1.ChangePercent.toFixed(2) +"%)</span>";
							 stockData+="<img src='up.png' width=10px height=10px>";
						}
						else
						if(obj1.Change<0)
						{
							stockData+="<span class='redFont'>"+obj1.Change.toFixed(2)+ "("+obj1.ChangePercent.toFixed(2) +"%)</span>";
							 stockData+="<img src='down.png' width=10px height=10px>";
						}
						 stockData+="</td></tr>";
						
						
						var myDate=new Date(obj1.Timestamp);
						myDate=moment(myDate).format('DD MMMM YYYY, h:mm:ss a');
						stockData+= "<tr><td><b>Timestamp</b></td><td>"+myDate+"</td></tr>";
						stockData+= "<tr><td><b>MarketCap</b></td><td>";
						var marketCap = (obj1.MarketCap / 1000000).toFixed(2);
					//	tdId="#tdMarketCap"+symbol;
						if (marketCap < 0.005)
							stockData+="" +  marketCap; //none
						else 
						{
							marketCap = (marketCap / 1000).toFixed(2);
							if (marketCap < 0.005)
								stockData+= marketCap + " Million"; //million
							else
								stockData+= marketCap + " Billion"; //billion
						}
        				
						stockData+="</td></tr>";
						stockData+= "<tr><td><b>Volume</b></td><td>"+obj1.Volume+"</td></tr>";
						var diff=obj1.LastPrice-obj1.ChangeYTD;
						stockData+= "<tr><td><b>Change YTD(Change Percent YTD)</b></td><td>";
						if(diff>0)
						{
							stockData+="<span class='greenFont'>" +diff.toFixed(2)+ "("+ obj1.ChangePercentYTD.toFixed(2) +"%)</span>";
							stockData+= "<img src='up.png' width=10px height=10px>";
						}
						else
						if(diff<0)
						{
							stockData+="<span class='redFont'>" +diff.toFixed(2)+ "("+obj1.ChangePercentYTD.toFixed(2) +"%)</span>";
							stockData+= "<img src='down.png' width=10px height=10px>";
						}
						stockData+= "</td></tr>"+
						 "<tr><td><b>High</b></td><td >$"+obj1.High+"</td></tr>"+
						 "<tr><td><b>Low</b></td><td >$"+obj1.Low+"</td></tr>"+
						 "<tr><td><b>Open</b></td><td >$"+obj1.Open+"</td></tr>";

						 
						 $("#tableData").empty().append(stockData);
						 
						 stockData="<img  src='http://chart.finance.yahoo.com/t?s="+obj1.Symbol+"&lang=en-US&width=400&height=300' width=100% height=90%>";
						 $("#yahooChart").empty().append(stockData); 
						 $("#myCarousel").carousel(1);
						 $("#leftInd").prop('disabled',false);
					
						  $('#leftInd').prop("title","Go to stock information");
				}		 
				
		}); 
	  
  }
  

  
 function clearValues()
 {
	//  document.getElementById("myForm").noValidate = true;
	  $("#companyName").val('');
	  $("#tableData").empty();
	  $("#chartContainer").empty();
	  $("#newsFeedsDialog").empty();
	 $("#leftInd").prop('disabled',true);
	$("#messages").empty();
	  $("#yahooChart").empty();
	  $("#myCarousel").carousel(0);
	  $('#leftInd').tooltip("disable");
	  $('#colorChange').css({"color":"white"});
	//  $("myForm").reset();
 }