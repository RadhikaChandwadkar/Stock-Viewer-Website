<?php    
                if (isset($_GET['lookup'])) 
                {
			
					$hcUrl="http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=". $_GET['lookup'];
					$out2=file_get_contents($hcUrl);
					$outt= json_decode($out2);
					
					foreach($outt as $key=>$value)
					{
						if($key=="Message")
					{
							header('Content-Type: application/json');
							$outt=file_get_contents($hcUrl);
							echo json_encode(array("stockValue"=>$outt));
							
					} 
					else 
				 	{

						//// NEWS FEED 
                    // Replace this value with your account key
                    $accountKey = 'FBDykdCMSS20ZbhSBooiOb8camd35J+tm6OWnxhnKlE';

                    $ServiceRootURL =  'https://api.datamarket.azure.com/Bing/Search/';

                    $WebSearchURL = $ServiceRootURL . 'News?$format=json&Query=';

                    $context = stream_context_create(array(
                        'http' => array(
                            'request_fulluri' => true,
                            'header'  => "Authorization: Basic " . base64_encode($accountKey . ":" . $accountKey)
                        )
                    ));

                    $request = $WebSearchURL . urlencode( '\'' . $_GET['lookup'] . '\'');

                   

                    $response = file_get_contents($request, 0, $context);

              //     $jsonobj = json_decode($response);

					$symbol=$_GET['lookup'];
            
					$hcUrl='http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":1095,"DataPeriod":"Day","Elements":[{"Symbol":"'.$symbol.'","Type":"price","Params":["ohlc"]}]}';
					
					$out1=file_get_contents($hcUrl);
			
			
			//stock value
			
			
			
				
			
					header('Content-Type: application/json');
                    echo json_encode(array("search"=>$response,"chart"=>$out1,"stockValue"=>$out2));
					
					}
					break;
				}
				
				
				}
				else
				if(isset($_GET['Symbol']))
				{
					 $lookupUrl= "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=". $_GET['Symbol'];
						
					 $lookup=file_get_contents($lookupUrl);
			
			
					header('Content-Type: application/json');
                    echo json_encode($lookup);
            
		
				}
				
				
?>