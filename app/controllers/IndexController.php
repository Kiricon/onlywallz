<?php

class IndexController extends \Phalcon\Mvc\Controller
{

    public function indexAction()
    {
        $totalwallz = count(Wallz::find());
        $wall = Wallz::findFirst(rand(1, $totalwallz));
        preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $wall->audio, $match);
        $this->view->setVar("wallpaper", $wall->wallpaper);
        $this->view->setVar("audio", $match[1]);

    }

}