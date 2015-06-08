<?php

class IndexController extends \Phalcon\Mvc\Controller
{

    public function indexAction()
    {
        $totalwallz = count(Wallz::find());
        $wall = Wallz::findFirst(rand(1, $totalwallz));
        $this->view->setVar("wallpaper", $wall->wallpaper);
        $this->view->setVar("audio", $wall->audio);
    }

}