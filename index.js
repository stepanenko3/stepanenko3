// index.js
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Mustache from 'mustache';
import fetch from 'node-fetch';
import fs from 'fs';

const templates = {
    main: {
        path: './main.mustache',
        removeLineBreaks: false,
    },
    package: {
        path: './package.mustache',
        removeLineBreaks: true,
    },
};

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/

function getRefreshDate() {
    let DATA = {
        me: {
            first_name: 'Artem',
            last_name: 'Stepanenko',
            username: 'stepanenko3',
            startWorkingYear: 2016,
            buymeacoffee: 'stepanenko',
        },

        readmeUpdatedInfo: true,
        badgeStyle: 'flat',

        skills: [
            {
                key: 'PHP',
                color: '777BB4',
                logo: 'php',
            },
            {
                key: 'Laravel',
                color: 'FF2D20',
                logo: 'laravel',
            },
            {
                key: 'Filament',
                color: 'FDAE4B',
                logo: 'filament',
            },
            {
                key: 'Nuxt',
                color: '00DC82',
                logo: 'nuxt',
            },
            {
                key: 'Docker',
                color: '46a2f1',
                logo: 'docker',
            },
            {
                key: 'Nova',
                color: '252D37',
                logo: 'laravelnova',
            },
            {
                key: 'JavaScript',
                color: 'F7DF1E',
                logo: 'javascript',
            },
            {
                key: 'Vue.js',
                color: '777BB4',
                logo: 'vue.js',
            },
            {
                key: 'PostgreSQL',
                color: '316192',
                logo: 'postgresql',
            },
            {
                key: 'MySQL',
                color: '4479A1',
                logo: 'mysql',
            },
            {
                key: 'JSON',
                color: '0000',
                logo: 'json',
            },
            {
                key: 'Git',
                color: 'F05032',
                logo: 'git',
            },
            {
                key: 'Redis',
                color: 'DC382D',
                logo: 'redis',
            },
            {
                key: 'ElasticSearch',
                color: '005571',
                logo: 'elasticsearch',
            },
            {
                key: 'HTML5',
                color: 'E34F26',
                logo: 'html5',
            },
            {
                key: 'CSS3',
                color: '1572B6',
                logo: 'css3',
            },
            {
                key: 'TypeScript',
                color: '007ACC',
                logo: 'typescript',
            },
            {
                key: 'SASS',
                color: 'CC6699',
                logo: 'sass',
            },
            {
                key: 'Markdown',
                color: '000000',
                logo: 'markdown',
            },
            {
                key: 'Angular',
                color: 'E23237',
                logo: 'angular',
            },
            {
                key: 'Tailwind_CSS',
                color: '38B2AC',
                logo: 'tailwindcss',
            },
            {
                key: 'jQuery',
                color: '0769AD',
                logo: 'jquery',
            },
            {
                key: 'Json_Web_Tokens',
                color: '323330',
                logo: 'json-web-tokens',
                logoColor: 'pink',
            },
            {
                key: 'Editor_Config',
                color: '000',
                logo: 'editorconfig',
            },
            {
                key: 'Jira',
                color: '0052CC',
                logo: 'jira',
            },
            {
                key: 'Notion',
                color: '000',
                logo: 'notion',
            },
            {
                key: 'Trello',
                color: '0052CC',
                logo: 'trello',
            },
            {
                key: 'GitLab',
                color: '330F63',
                logo: 'gitlab',
            },
            {
                key: 'GitHub',
                color: '100000',
                logo: 'github',
            },
            {
                key: 'BitBucket',
                color: '0052CC',
                logo: 'bitbucket',
            },
            {
                key: 'Figma',
                color: 'F24E1E',
                logo: 'figma',
            },
            {
                key: 'Webpack',
                color: '8DD6F9',
                logo: 'webpack',
            },
            {
                key: 'NPM',
                color: 'CB3837',
                logo: 'npm',
            },
            {
                key: 'rabbitmq',
                color: '%23FF6600',
                logo: 'rabbitmq',
            },
            {
                key: 'eslint',
                color: '3A33D1',
                logo: 'eslint',
            },
            {
                key: 'Jenkins',
                color: 'D24939',
                logo: 'Jenkins',
            },
            {
                key: 'RSS',
                color: 'FFA500',
                logo: 'rss',
            },
            {
                key: 'GitHub_Actions',
                color: '2088FF',
                logo: 'github-actions',
            },
            {
                key: 'Gulp',
                color: 'CF4647',
                logo: 'gulp',
            },
            {
                key: 'Postman',
                color: 'FF6C37',
                logo: 'postman',
            },
            {
                key: 'Shell_Script',
                color: '121011',
                logo: 'gnu-bash',
            },
            {
                key: 'Swagger',
                color: '85EA2D',
                logo: 'Swagger',
            },
            {
                key: 'Vite',
                color: 'B73BFE',
                logo: 'vite',
            },
            {
                key: 'web3.js',
                color: 'F16822',
                logo: 'web3.js',
            },
            {
                key: 'Vuetify',
                color: '1867C0',
                logo: 'vuetify',
            },
            {
                key: 'Yarn',
                color: '2C8EBB',
                logo: 'yarn',
            },
            {
                key: 'Pug',
                color: 'E3C29B',
                logo: 'pug',
            },
            {
                key: 'MacOS',
                color: '000000',
                logo: 'apple',
            },
            {
                key: 'Visual_Studio_Code',
                color: '0078D4',
                logo: 'visual-studio-code',
            },
        ],

        novaPackages: [
            {
                name: 'Nova Command Runner',
                key: 'nova-command-runner',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Logs Tool',
                key: 'nova-logs-tool',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Settings',
                key: 'nova-settings',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Cards',
                key: 'nova-cards',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Media Field',
                key: 'nova-media-field',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Boolean Group Field',
                key: 'nova-boolean-group-field',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Health',
                key: 'nova-health',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Markdown',
                key: 'nova-markdown',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova JSON',
                key: 'nova-json',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Menu Collapsed',
                key: 'nova-menu-collapsed',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Nova Image Tags',
                key: 'nova-image-tags',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
        ],

        laravelPackages: [
            {
                name: 'Laravel Initializer',
                key: 'laravel-initializer',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Laravel System Resources',
                key: 'laravel-system-resources',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Laravel Pagination',
                key: 'laravel-pagination',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Laravel Helpers',
                key: 'laravel-helpers',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Laravel Runtime Config',
                key: 'laravel-runtime-config',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
            {
                name: 'Laravel Log Viewer',
                key: 'laravel-log-viewer',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
        ],

        otherPackages: [
            {
                name: 'Vue3 Nestable',
                key: 'vue3-nestable',
                manager: 'npm',
                packagist: false,
                npm: true,
            },
            {
                name: 'Composer Versions Check',
                key: 'composer-versions-check',
                manager: 'packagist',
                packagist: true,
                npm: false,
            },
        ],

        jsPackages: [
            {
                name: 'Js Utils',
                key: '@stepanenko3/js-utils',
                manager: 'npm',
                packagist: false,
                npm: true,
            },
            {
                name: 'Js Toasts',
                key: '@stepanenko3/js-toast',
                manager: 'npm',
                packagist: false,
                npm: true,
            },
        ],

        date: new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'Europe/Kiev',
        }),
    };

    DATA.package = function () {
        return {
            npm: this.key,
            packagist: `${DATA.me.username}/${this.key}`,
        }[this.manager];
    };

    return DATA;
}

async function getWeatherInformation() {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
    )
        .then(r => r.json())
        .then(r => {
            let refreshDate = getRefreshDate();
            let data = {
                ...refreshDate,
            };

            if (r.main) {
                data.city = r.name;
                data.city_temp = Math.round(r.main.temp);
                data.city_temp_feels_like = Math.round(r.main.feels_like);
                data.city_weather = r.weather[0].description;
                data.city_weather_icon = r.weather[0].icon;
                data.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Kiev',
                });
                data.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Kiev',
                });
            }

            return data;
        });
}

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
async function generateReadMe(data) {

    const partials = {};

    Object
        .keys(templates)
        .forEach(n => {
            const template = templates[n];
            let content = fs.readFileSync(template.path).toString();

            if (template.removeLineBreaks) {
                content = content
                    .replace(/(\r\n|\n|\r)/gm, ' ')
                    .replace(/\s\s+/g, ' ');
            }

            partials[n] = content;
        })

    const main = partials.main || '';

    if (!main)
        return;

    const output = Mustache.render(main, data, partials);

    fs.writeFileSync('README.md', output);
}

async function action() {

    /**
     * Fetches Weather and Generates README
     */
    await getWeatherInformation().then(generateReadMe);
}

action();
