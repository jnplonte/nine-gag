<?php
namespace nineGag\Command;

class nineGagHelpers
{
    private function _curlInstagramGet($userName=null, $lastPostId='') {
      if(empty($userName)){
        return array( "status" => false, "error" => 'user name is required', "data" => null );
      }

      $curl = curl_init();
      
      curl_setopt_array($curl, array(
        CURLOPT_URL => "https://www.instagram.com/".$userName."/media/?max_id=".$lastPostId, //hardcoded url
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
          "cache-control: no-cache",
          "content-type: application/x-www-form-urlencoded"
        ),
      ));

      $response = curl_exec($curl);

      $err = curl_error($curl);
      $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

      curl_close($curl);

      if (empty($err) && $status == '200') {
        return array( "status" => true, "error" => null, "data" => $response );
      } else {
        switch ($status) {
          case 404:
            $err = 'invalid user name';
          break;
          default:
            $err = 'Unexpected HTTP code: '. $status;
        }
        return array( "status" => false, "error" => $err, "data" => null );
      }
    }

    public function _throwMessage($status='info', $text=null, $layout=null) {
      if($layout){
        switch ($layout) {
          case 'alpha-error':
            return '<'.$status.'>'.$text.' must be alphabetic characters</'.$status.'>';
          break;

          case 'num-error':
            return '<'.$status.'>'.$text.' must be numeral characters</'.$status.'>';
          break;

          default:
            return '<error>Internal Server Error</error>';
          break;
        }
      }else{
        if($text){
          return '<'.$status.'>'.$text.'</'.$status.'>';
        }else{
          return '<error>Internal Server Error</error>';
        }
      }
    }

    public function _dataStore($userName=null, $lastPostId='') {
      $instagramData = $this->_curlInstagramGet($userName, $lastPostId);
      if(!empty($instagramData['status']) && !empty($instagramData['data'])) {
          $instagramItem = json_decode($instagramData['data']);
          return ($instagramItem->more_available) ? array('id' => end($instagramItem->items)->id, 'cnt' => (int) count($instagramItem->items), 'items' => $instagramItem->items) : null;
      } else {
          return $instagramData['error']; 
      }
  }
}
