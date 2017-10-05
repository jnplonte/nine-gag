<?php
namespace nineGag\Command;

class nineGagFunctions
{
    private $app;

    private $conn;

    private function cleanObject($object=null, $encode=true){
        foreach ($object as $key => $val) {
            unset($val->width);
            unset($val->height);
            unset($val->id);
        }

        if ($encode) {
            return json_encode($object);
        } else {
            return $object;
        }
    }

    function __construct(){
        $this->app = new \Cilex\Application('Cilex');
        $this->app->register(new \Cilex\Provider\ConfigServiceProvider(), array('config.path' => 'config.json'));
    }

    protected function _DBConnect(){
        $this->conn = mysqli_connect($this->app['config']->dbServer, $this->app['config']->dbUser, $this->app['config']->dbPassword, $this->app['config']->dbName);
    }

    public function _clearPost(){
        $this->_DBConnect();
        
        if (!$this->conn) {
            return 'connection to database failed';
        }

        $sqlClear = "TRUNCATE TABLE post";

        if (mysqli_query($this->conn, $sqlClear)) {
            $hasError = false;
        } else {
            $hasError = mysqli_error($this->conn);
        }

        mysqli_close($this->conn);

        return $hasError;
    }

    public function _insertPost($postData=null){
        if(empty($this->_clearPost())){
            $this->_DBConnect();
            
            if (!$this->conn && empty($postData)) {
                return 'connection to database failed';
            }

            $sqlInsert = "INSERT INTO post (iId, code, link, image, video, carousel, type, caption, likeCount, commentCount, createdTime) values ";

            $valuesArr = array(); 
            foreach($postData as $row){
                $iId = !empty($row->id) ? mysqli_real_escape_string($this->conn, $row->id) : null;
                $code = !empty($row->code) ? mysqli_real_escape_string($this->conn, $row->code) : null;
                $link = !empty($row->link) ? mysqli_real_escape_string($this->conn, $row->link) : null;
                $image = !empty($row->images) ? mysqli_real_escape_string($this->conn, $this->cleanObject($row->images, true)) : null;
                $video = !empty($row->videos) ? mysqli_real_escape_string($this->conn, $this->cleanObject($row->videos, true)) : null;

                $carouselArr = array();
                if(!empty($row->carousel_media)){
                    foreach ($row->carousel_media as $key => $val) {
                        $carouselArr[] = !empty($val->images) ? $this->cleanObject($val->images, false) : '';
                    }
                }
                $carousel = !empty($carouselArr) ? mysqli_real_escape_string($this->conn, json_encode($carouselArr)) : null;

                $type = !empty($row->type) ? mysqli_real_escape_string($this->conn, $row->type) : 'image'; //set image as default
                // $caption = !empty($row->caption->text) ? mysqli_real_escape_string($this->conn, nl2br($row->caption->text)) : '';
                $caption = !empty($row->caption->text) ? mysqli_real_escape_string($this->conn, $row->caption->text) : '';
                $likeCount = !empty($row->comments->count) ? (int) $row->likes->count : 0;
                $commentCount = !empty($row->comments->count) ? (int) $row->comments->count : 0;
                $createdTime = !empty($row->created_time) ? (int) $row->created_time : time();

                $valuesArr[] = "('$iId', '$code', '$link', '$image', '$video', '$carousel', '$type', '$caption', '$likeCount', '$commentCount', '$createdTime')";
            }
        
            $sqlInsert .= implode(',', $valuesArr);

            if (mysqli_query($this->conn, $sqlInsert)) {
                $hasError = false;
            } else {
                $hasError = mysqli_error($this->conn);
            }

            mysqli_close($this->conn);
        }else{
            $hasError = 'failed to truncate table';
        }
            
        return $hasError;
    }
}
