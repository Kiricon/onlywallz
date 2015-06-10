<?php
class WallzController extends \Phalcon\Mvc\Controller {
    public function indexAction() {
        $request = new Phalcon\Http\Request();
        $response = new \Phalcon\Http\Response();
        if($request->isGet()){

            // Count total number of rows
            $totalwallz = count(Wallz::find());

            //pull a random wall table entry/model from table
            $wall = Wallz::findFirst(rand(1, $totalwallz));

            //build array from model pulled
            $data = array('wallpaper' => $wall->wallpaper, 'audio' => $wall->audio);

            //Set the content of the response to our json wall
            $response->setContent(json_encode($data));

            //Return response
            return $response;
        }

        if($request->isPost()){
            $walldata = $request->getJsonRawBody();

            $newwall = new Wallz();

            $newwall->wallpaper = $walldata->wallpaper;
            $newwall->audio = $walldata->audio;

            if($newwall->save()) {
                $response->setContent(json_encode($walldata));
                return $response;
            }


        }
    }
}