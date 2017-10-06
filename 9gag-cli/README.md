# CLI APPLICATION


## Dependencies
* php: [http://php.net/](http://php.net/)
* mysql: [https://www.mysql.com/](https://www.mysql.com/)
* cilex: [http://cilex.github.io/](http://cilex.github.io/)
* phpunit: [https://phpunit.de/](https://phpunit.de/)
* composer: [https://getcomposer.org/](https://getcomposer.org/)


## Installation
- Install dependencies by running `composer install`
- update the following configurations and database credentials on `{root}/config.js`
- Import database by running `mysql -u{username} -p {database-name} < 9gag_db.sql`


## How to Use
- run `php nineGag.php` or `./nineGag.php` it will show the available command you can use

#### import intagram post
- `php nineGag.php instagram:import "<userName>" "<numPost>"`
- sample: `php nineGag.php instagram:import "9gag" "200"`

#### import featured intagram post
- `php nineGag.php instagram:featured`
- sample: `php nineGag.php instagram:featured`


## Testing
- run `phpunit --bootstrap nineGagTest/nineGagTest.php nineGagTest/instagramTest.php`
