<?php
class WallzController extends \Phalcon\Mvc\Controller {
    public function indexAction() {
        $request = new Phalcon\Http\Request();
        $response = new \Phalcon\Http\Response();
        if($request->isGet()){

            //pull wall table entry/model from table
            $wall = Wallz::findFirst();
            //build array from model pulled
            $data = array('wallpaper' => $wall->wallpaper, 'audio' => $wall->audio);

            //Set the content of the response to our json wall
            $response->setContent(json_encode($data));

            //Return response
            return $response;
        }
    }
}