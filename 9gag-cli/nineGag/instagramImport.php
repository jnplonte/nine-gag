<?php
namespace Cilex\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

use nineGag\Command as nineGagCommand;

class instagramImport extends Command
{
    private $nineGagFunctions;

    private $nineGagHelpers;

    private $postData = [];

    protected function configure() {
        $this
            ->setName('instagram:import')
            ->setDescription('import latest instagram feed (instagram username) (number of post to import)')
            ->addArgument('userName', InputArgument::REQUIRED, 'instagram username is required')
            ->addArgument('postNumber', InputArgument::REQUIRED, 'number of instagram post is required');

        $this->nineGagFunctions = new nineGagCommand\nineGagFunctions();

        $this->nineGagHelpers = new nineGagCommand\nineGagHelpers();
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $userName = $input->getArgument('userName');
        $postNumber = $input->getArgument('postNumber');

        if(!preg_match("/^-?[0-9]+(?:\.[0-9]{1,2})?$/", $postNumber)){
            return $output->writeln($this->nineGagHelpers->_throwMessage('error', 'post number', 'num-error'));
        }

        $lastPostId = ''; $postCnt = 0; $hasError = '';
        while(((int) $postNumber) > $postCnt) {
            $dataStore = $this->nineGagHelpers->_dataStore($userName, $lastPostId);
            
            if (is_array($dataStore)) {
                $lastPostId = $dataStore['id']; 
                $postCnt = $postCnt + $dataStore['cnt'];

                $this->postData = array_merge($this->postData, $dataStore['items']); 
            } else {
                if(!empty($dataStore)){
                    $hasError = $dataStore;
                }
                break;
            }
            $output->writeln('inserting '.$postCnt.' out of '.$postNumber.' data'); 
        }

        if(empty($this->postData) && !empty($hasError)){
            return $output->writeln($this->nineGagHelpers->_throwMessage('error', $hasError));
        }

        $noError = $this->nineGagFunctions->_insertPost($this->postData);
        if(empty($noError)){
            $output->writeln($this->nineGagHelpers->_throwMessage('info', 'data import success'));
        }else{
            $output->writeln($this->nineGagHelpers->_throwMessage('error', $noError));
        }
    }
}
