const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

/**
 * 获取XX路径下所有页面
 * @param {string} pagePath 解析路径
 */
function getEntries(pagePath) {
    let res = fs.readdirSync(pagePath);
    let entries = {};
    res.forEach(item => {
        entries[item] = path.resolve(__dirname, `../${pagePath}/${item}/index.js`)
        console.log(chalk.green(`pages: ${chalk.red.bold(item)}`));
    })
    return entries;
}

exports.getEntries = getEntries