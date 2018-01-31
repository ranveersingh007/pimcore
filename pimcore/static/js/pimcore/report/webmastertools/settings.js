/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) 2009-2016 pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.report.webmastertools.settings");
pimcore.report.webmastertools.settings = Class.create({

    initialize: function (parent) {
        this.parent = parent;
    },

    getKey: function () {
        return "webmastertools";
    },

    getLayout: function () {

        this.panel = new Ext.FormPanel({
            layout: "pimcoreform",
            title: "Google Webmastertools",
            bodyStyle: "padding: 10px;",
            autoScroll: true,
            items: [
                {
                    xtype: "displayfield",
                    width: 300,
                    hideLabel: true,
                    value: "&nbsp;<br />" + t("search_console_settings_description"),
                    cls: "pimcore_extra_label"
                },
                {
                    xtype: "panel",
                    style: "padding:30px 0 0 0;",
                    border: false,
                    items: this.getConfigurations()
                }
            ]
        });

        return this.panel;
    },

    getConfigurations: function () {

        this.configCount = 0;
        var configs = [];
        var sites = pimcore.globalmanager.get("sites");

        sites.each(function (record) {
            var id = record.data.id;
            var key = "site_" + id;
            if(!id) {
                id = "default";
                key = "default";
            }

            configs.push(this.getConfiguration(key, record.data.domain, id));
        }, this);


        return configs;
    },

    getConfiguration: function (key, name, id) {

        var config = {
            xtype: "fieldset",
            labelWidth: 250,
            title: name,
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: t("verification_filename_text") + " (google1d765d927ceexxxx.html)",
                    name: "verification",
                    width: 250,
                    value: this.parent.getValue("webmastertools.sites." + key + ".verification"),
                    id: "report_settings_webmastertools_verification_" + id
                }
            ]
        };

        return config;
    },

    getValues: function () {

        var formData = this.panel.getForm().getFieldValues();
        var sites = pimcore.globalmanager.get("sites");
        var sitesData = {};

        sites.each(function (record) {
            var id = record.data.id;
            var key = "site_" + id;
            if(!id) {
                id = "default";
                key = "default";
            }

            sitesData[key] = {
                verification: Ext.getCmp("report_settings_webmastertools_verification_" + id).getValue()
            };
        }, this);

        var values = {
            sites: sitesData
        };

        return values;
    }
});


pimcore.report.settings.broker.push("pimcore.report.webmastertools.settings");