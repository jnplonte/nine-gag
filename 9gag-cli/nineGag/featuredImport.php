<?php
namespace Cilex\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

use nineGag\Command as nineGagCommand;

class featuredImport extends Command
{
    private $nineGagFunctions;

    private $nineGagHelpers;

    private $postData = [];

    protected function configure() {
        $this
            ->setName('instagram:featured')
            ->setDescription('import featured instagram feed');

        $this->nineGagFunctions = new nineGagCommand\nineGagFunctions();

        $this->nineGagHelpers = new nineGagCommand\nineGagHelpers();
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $noError = $this->nineGagFunctions->_insertFeatured();
        if(empty($noError)){
            $output->writeln($this->nineGagHelpers->_throwMessage('info', 'data import success'));
        }else{
            $output->writeln($this->nineGagHelpers->_throwMessage('error', $noError));
        }
    }
}
