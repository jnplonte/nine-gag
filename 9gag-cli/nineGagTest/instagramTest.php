<?php
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Helper\HelperSet;
use Symfony\Component\Console\Tester\CommandTester;

class instagramTest extends \PHPUnit_Framework_TestCase{

    private $userName = '9gag';
    private $postNumber = '20';

    private $application;

    function __construct(){
        $this->application = new Application();
    }

    private function getInputStream($input){
        $stream = fopen('php://memory', 'r+', false);
        fputs($stream, $input);
        rewind($stream);

        return $stream;
    }

    private function executeTest($cmd=null, $data=array(), $hasChoice=false){
      if(!empty($cmd)){
        $command = $this->application->find($cmd);
        $commandTester = new CommandTester($command);
        if($hasChoice){
          $helper = $command->getHelper('question');
          $helper->setInputStream($this->getInputStream("0"));
        }
        $execData = array( 'command' => $command->getName());
        $commandTester->execute(array_merge($execData, $data));

        return $commandTester;
      }else{
        return null;
      }
    }

    public function testImportSuccess(){
        $this->application->add(new \Cilex\Command\instagramImport());

        $commandTester = $this->executeTest('instagram:import', array('userName' => $this->userName, 'postNumber' => $this->postNumber), true);

        $this->assertRegExp('/data import success/', $commandTester->getDisplay());
    }

    public function testImportPostNumberFailed(){
        $this->application->add(new \Cilex\Command\instagramImport());

        $commandTester = $this->executeTest('instagram:import', array('userName' => $this->userName, 'postNumber' => 'abc'), true);

        $this->assertRegExp('/numeral characters/', $commandTester->getDisplay());
    }

    public function testImportUserNameFailed() {
        $this->application->add(new \Cilex\Command\instagramImport());

        $commandTester = $this->executeTest('instagram:import', array('userName' => 'invalid-instagram-random-user-name', 'postNumber' => $this->postNumber), true);

        $this->assertRegExp('/invalid user name/', $commandTester->getDisplay());
    }

    public function testImportFeaturedSuccess(){
        $this->application->add(new \Cilex\Command\featuredImport());

        $commandTester = $this->executeTest('instagram:featured');

        $this->assertRegExp('/data import success/', $commandTester->getDisplay());
    }
}
