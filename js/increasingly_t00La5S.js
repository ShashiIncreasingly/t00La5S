/* eslint-disable no-inner-declarations */
//https://www.toolup.com/sca-dev-2021-2-0/checkout.ssp?is=checkout&_ga=2.219656473.1432805250.1712735580-542172134.1708322897#confirmation?last_order_id=65758588
var versionUpdate = (new Date()).getTime();
function generateRandomString(bits1) {
    return (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295).toString(bits1).substring(2, 15) + (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295).toString(bits1).substring(2, 15);
}

function getVisitorId() {
    function generateUniqueINCVisitorId(len, bits) {
        var bits1 = bits || 36;
        var outStr = "";
        var newStr;
        while (outStr.length < len) {
            newStr = generateRandomString(bits1).toString().slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
        }
        return outStr;
    }
    var clientdomain = window.location.host;
    var arr = clientdomain.split(".");
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    var ivid = "";
    if (readCookie("ivid") != undefined) {
        ivid = readCookie("ivid");
    }
    if (ivid.length == 0) {
        ivid = generateUniqueINCVisitorId(42, 16);
        arr.shift();
        clientdomain = arr.join(".");
        if (arr == "com" || window.location.host.indexOf("www") == -1) {
            clientdomain = window.location.host;
        }
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        expires = "expires=" + d.toUTCString();
        document.cookie = "ivid=" + ivid + "; expires=" + expires + "; domain=" + clientdomain + "; path=/" + "; secure;";
    } else {
        arr.shift();
        clientdomain = arr.join(".");
        if (arr == "com" || window.location.host.indexOf("www") == -1) {
            clientdomain = window.location.host;
        }
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        expires = "expires=" + d.toUTCString();
        document.cookie = "ivid=" + ivid + "; expires=" + expires + "; domain=" + clientdomain + "; path=/" + "; secure;";
    }
    return ivid;
}
getVisitorId();

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var s of ca) {
        var c = s;
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (readCookie("ivid") != null) {
    let cook_ids = readCookie("ivid");
    localStorage.setItem("inc_cookie", cook_ids);
}
function conversion_pixel(){
    if (window.location.host === "www.toolup.com" && window.location.href.indexOf("confirmation") >= 0 && window.location.href.indexOf("checkout.ssp") >= 0) {
        let conversion_pixel_flag = true;
        let optimisedtrack = "//usaoptimizedby.increasingly.co";
        let client_id = "328";
        let products;
        let orderID = 0;
        let orderAmount = 0;
        let inctax = 0;
        let incship = 0;
        let curencyinc = "USD";
        let couponcode = "";
        let discountinc = 0;
        setTimeout(function () {
            try {
                setTimeout(function () {
                    if (window.dataLayer != undefined) {
                        for (let d = 0; d < window.dataLayer.length; d++) {
                            if (window.dataLayer[d].ecommerce != undefined) {
                                if (window.dataLayer[d].ecommerce.purchase != undefined) {
                                    if (window.dataLayer[d].ecommerce.purchase.actionField != undefined) {
                                        if (window.dataLayer[d].ecommerce.purchase.actionField.id != undefined) {
                                            products = window.dataLayer[d].ecommerce.purchase.products;
                                            orderID = window.dataLayer[d].ecommerce.purchase.actionField.id;
                                            inctax = window.dataLayer[d].ecommerce.purchase.actionField.tax;
                                            incship = window.dataLayer[d].ecommerce.purchase.actionField.shipping;
                                            orderAmount = window.dataLayer[d].ecommerce.purchase.actionField.revenue;
                                            inctax = window.dataLayer[d].ecommerce.purchase.actionField.tax;
                                            if (window.dataLayer[d].ecommerce.purchase.actionField.discount != undefined) {
                                                discountinc = window.dataLayer[d].ecommerce.purchase.actionField.discount;
                                            }
                                            if (window.dataLayer[d].ecommerce.purchase.actionField.coupon != undefined) {
                                                couponcode = window.dataLayer[d].ecommerce.purchase.actionField.coupon;
                                            }
                                            if (window.dataLayer[d].ecommerce.currencyCode != undefined) {
                                                curencyinc = window.dataLayer[d].ecommerce.currencyCode;
                                            }
                                            if (conversion_pixel_flag) {
                                                console.log("track conversion calling");
                                                trackConversion();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, 2000);
            } catch (er) {
                console.log(er.stack);
            }

            function trackConversion() {
                try {
                    conversion_pixel_flag = false;
                    let _incProductsInfo = "";
                    let _ivid = "";
                    if (localStorage.getItem("inc_cookie") != null && localStorage.getItem("inc_cookie") != "" && localStorage.getItem("inc_cookie") != undefined) {
                        _ivid = localStorage.getItem("inc_cookie");
                    }

                    if (_ivid == null || _ivid == "" || _ivid == undefined) {
                        _ivid = readCookie("ivid");
                    }

                    if (products != undefined && products != null) {
                        for (let prdetails of products) {
                            if (prdetails.price != 0) {
                                var p4v = prdetails.sku;
                                if (prdetails.id != undefined) {
                                    p4v = prdetails.id;
                                }
                                _incProductsInfo += "p1=" + prdetails.sku + "&p2=" + prdetails.price + "&p3=" + prdetails.quantity + "&p4=" + p4v + "|";
                            }
                        }
                        _incProductsInfo = _incProductsInfo.replace(/\|$/, "");

                        let _incConvPixData =
                            "" +
                            optimisedtrack +
                            "/track?CONVERSION_PIXEL/clientId=" +
                            client_id +
                            "&orderId=" +
                            orderID +
                            "&orderAmount=" +
                            orderAmount +
                            "&orderStatus=" +
                            escape("complete") +
                            "&currency=" +
                            curencyinc +
                            "&discountAmount=" +
                            discountinc +
                            "&transactionTax=" +
                            inctax +
                            "&transactionShipping=" +
                            incship +
                            "&couponCode=" +
                            couponcode +
                            "&storeCode=" +
                            curencyinc +
                            "&ivid=" +
                            _ivid +
                            "&productsInfo=" +
                            escape(_incProductsInfo) +
                            "&cb=" +
                            Math.floor(Math.random() * 999999);
                        console.log("data -- " + _incConvPixData);

                        let _incConvPixElm = document.createElement("img");
                        _incConvPixElm.setAttribute("border", "0");
                        _incConvPixElm.setAttribute("width", "1");
                        _incConvPixElm.setAttribute("height", "1");
                        _incConvPixElm.setAttribute("src", _incConvPixData);
                        _incConvPixElm.setAttribute("style", "display:none");
                        let _incConvPixPlaceToSet = document.querySelector("body");
                        _incConvPixPlaceToSet.appendChild(_incConvPixElm);
                    }
                } catch (err) {
                    let formData = new FormData();
                    formData.append("EmailId", "tech@increasingly.com");
                    formData.append("Subject", "Conversion pixel Error on Toolup");
                    formData.append("Message", err.stack);
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "//api.increasingly.co/SendEmail", true);
                    xhr.send(formData);
                }
            }
        }, 1000);
    }
}

conversion_pixel()

var previousUrl = "";
var observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        if (window.location.host === "www.toolup.com" && window.location.href.indexOf("confirmation") >= 0 && window.location.href.indexOf("checkout.ssp") >= 0) {
            setTimeout(function(){
                conversion_pixel()
            },1000)
        }
    }
});

const config = {
    subtree: true,
    childList: true
};
observer.observe(document, config);

let seachForSKUinHTML = () => {
    const scriptElements = document.getElementsByTagName("script");
    let sku = null;
    // Iterate over each script element
    for (let script of scriptElements) {
        // Extract the JavaScript code from the script element
        const scriptContent = script.textContent || script.innerText;
        const skuAssignmentRegex = /sku\s*:\s*(\w+)/g;
        // Check if the JavaScript code contains the variable definition you're interested in
        if (scriptContent.includes("var turnToConfig") && scriptContent.includes("sku")) {
            let match;
            while ((match = skuAssignmentRegex.exec(scriptContent)) !== null) {
                // match[1] contains the value assigned to 'sku'
                sku = match[1];
            }
        }
    }
    return sku;
};

// Crawling
function crawlData(timeout) {
    setTimeout(() => {
        if (document.querySelector('.product-details-full-content-header-title') != null){
            function getCookie(cookieName) {
                // Split all cookies into an array
                const cookies = document.cookie.split(";");

                // Iterate through each cookie
                for (let i = 0; i < cookies.length; i++) {
                    // Split the cookie into name and value
                    const cookie = cookies[i].trim().split("=");

                    // Check if the cookie name matches the provided name
                    if (cookie[0] === cookieName) {
                        // Return the cookie value
                        return decodeURIComponent(cookie[1]);
                    }
                }

                // If cookie not found, return null
                return null;
            }
            var Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (e) {
                    let t = "";
                    let n, r, i, s, o, u, a;
                    let f = 0;
                    e = Base64._utf8_encode(e);
                    while (f < e.length) {
                        n = e.charCodeAt(f++);
                        r = e.charCodeAt(f++);
                        i = e.charCodeAt(f++);
                        s = n >> 2;
                        o = ((n & 3) << 4) | (r >> 4);
                        u = ((r & 15) << 2) | (i >> 6);
                        a = i & 63;
                        if (isNaN(r)) {
                            u = a = 64;
                        } else if (isNaN(i)) {
                            a = 64;
                        }
                        t += this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
                    }
                    return t;
                },
                decode: function (e) {
                    let t = "";
                    let n, r, i, s, o, u, a;
                    let f = 0;
                    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = (s << 2) | (o >> 4);
                        r = ((o & 15) << 4) | (u >> 2);
                        i = ((u & 3) << 6) | a;
                        t += String.fromCharCode(n);
                        if (u != 64) {
                            t += String.fromCharCode(r);
                        }
                        if (a != 64) {
                            t += String.fromCharCode(i);
                        }
                    }
                    t = Base64._utf8_decode(t);
                    return t;
                },
                _utf8_encode: function (e) {
                    e = e.replace(/rn/g, "n");
                    let t = "";
                    for (let n = 0; n < e.length; n++) {
                        let r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode((r >> 6) | 192);
                            t += String.fromCharCode((r & 63) | 128);
                        } else {
                            t += String.fromCharCode((r >> 12) | 224);
                            t += String.fromCharCode(((r >> 6) & 63) | 128);
                            t += String.fromCharCode((r & 63) | 128);
                        }
                    }
                    return t;
                },
                _utf8_decode: function (e) {
                    let t = "";
                    let n = 0;
                    let r, c1, c2, c3;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++;
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
                            n += 2;
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            n += 3;
                        }
                    }
                    return t;
                },
            };

            function parseNumbersFromString(text) {
                // Regular expression to match the amount pattern
                var regex = /\$?[\d,]+(?:\.\d+)?/;

                // Extracting the amount from the text using the regex
                var match = text.match(regex);

                if (match) {
                    // Extracted amount will be in match[0]
                    var amountString = match[0];

                    // Removing dollar sign and commas from the string before parsing to float
                    var amountNumeric = parseFloat(amountString.replace(/[$,]/g, ""));

                    return amountNumeric;
                } else {
                    return null; // Return null if amount is not found in the text
                }
            }

            const getCurrentFormattedTime = () => {
                var d = new Date();
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
            };

            function getImage() {
                let output = [];
                let allImages = document.querySelectorAll(".bx-pager-item img");
                allImages.forEach((image) => {
                    const questionMarkIndex = image.src.indexOf("?");
                    const modifiedUrl = image.src.substring(0, questionMarkIndex);
                    output.push(modifiedUrl);
                });
                return output;
            }

            function getCategory() {
                let breadcrumb = document.querySelector(".global-views-breadcrumb");
                let array = breadcrumb.innerText.split("  ");
                // Remove the first element
                array.shift();

                // Remove the last element
                array.pop();
                array = array.join("|");
                return array;
            }

            function jsonData() {
                const scriptTags = document.getElementsByTagName("script");

                let rating = null;
                let review = null;

                // Iterate through each script tag
                for (let i = 0; i < scriptTags.length; i++) {
                    const script = scriptTags[i];

                    // Check if the script tag has type 'application/ld+json'
                    if (script.type === "application/ld+json") {
                        // Access and parse the content of the script tag
                        try {
                            let data = JSON.parse(script.textContent);
                            if (data.aggregateRating) {
                                rating = data.aggregateRating.ratingValue;
                                review = data.aggregateRating.reviewCount;
                            }
                        } catch (error) {
                            console.error("Error parsing JSON data:", error);
                        }
                    }
                }

                return [rating, review];
            }

            function getDesription() {
                let description = null;
                let element = document.querySelector('section[data-view="Product.Information"]');
                if (element) {
                    description = element.innerHTML;
                }
                return description;
            }

            function getPromo() {
                let saleText = "Sale";
                let specialText = "Special Offer";
                let specialBadge = document.querySelector(".promo-banner");
                let saleBadge = document.querySelector(".product-views-price-lead");
                let finalText = null;

                if (specialBadge) {
                    finalText = specialText;
                } else if (!specialBadge && saleBadge && saleBadge.innerText.includes(saleText)) {
                    finalText = saleText;
                }

                return finalText;
            }

            function getPrice() {
                let client_active_price = null;
                let client_special_price = null;
                let canCrawl = true;

                client_active_price = document.querySelector(".product-views-msrp") ? parseNumbersFromString(document.querySelector(".product-views-msrp").innerText).toFixed(2).toString() : 0;
                if (document.querySelector(".product-views-price-lead")) {
                    if (document.querySelector(".product-views-price-lead").getAttribute("data-rate")) {
                        client_special_price = parseNumbersFromString(document.querySelector(".product-views-price-lead").getAttribute("data-rate")).toFixed(2).toString();
                    } else {
                        if (document.querySelector(".product-views-price-lead [itemprop=lowPrice]")) {
                            canCrawl = false;
                        }
                    }
                }

                if (client_active_price == 0) {
                    client_active_price = client_special_price;
                    client_special_price = null;
                }

                if (client_active_price == client_special_price) {
                    client_active_price = client_special_price;
                    client_special_price = null;
                }
                return [client_active_price, client_special_price, canCrawl];
            }

            function checkOOS() {
                let stock = 100;
                let element = document.querySelector(".product-line-stock-msg-out-text");
                if (element) {
                    if (element.textContent.includes("Sold out")) {
                        stock = 0;
                    }
                }
                return stock;
            }
            let minqty = "1"
            if(document.querySelector('.product-details-quantity-options input') != null){
                if(document.querySelector('.product-details-quantity-options input').getAttribute('min') != undefined){
                    minqty = document.querySelector('.product-details-quantity-options input').getAttribute('min')
                }
            }
            let product_id = seachForSKUinHTML();
            let images = getImage();
            let categories = getCategory();

            let rating = jsonData()[0];
            let review = jsonData()[1];
            let promo = getPromo();
            let description = getDesription();
            let clientActivePrice = getPrice()[0];
            let clientSpecialPrice = getPrice()[1];
            let oosproduct = checkOOS();
            let canCrawl = getPrice()[2];

            if (canCrawl == false) return;
            var format_json_data = JSON.stringify({
                event_data: {
                    product_id: product_id,
                    promotional_message: promo,
                    product_price: clientActivePrice,
                    special_price: clientSpecialPrice,
                    field4: rating,
                    field3:minqty,
                    field5: review,
                    description: encodeURI(description),
                    categories: categories,
                    qty: oosproduct,
                    other_image_list: images,
                },
                event_type: "product_page_visit",
                method: "track",
                token: "T0o7u9",
            });

            var data = {
                eventData: Base64.encode(format_json_data),
                vid: getCookie("ivid"),
                time: getCurrentFormattedTime(),
                uri: document.location.href,
            };

            var p_url = "https://usagather.increasingly.com/ImportCrawledData";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        if (xhr.responseText != "" && xhr.responseText != null) {
                            // m_incBndle.DataModel.jsonData = xhr.responseText;
                            // callback(m_incBndle.DataModel.jsonData)
                        } else {
                            //console.log(xhr);
                        }
                    }
                }
            };
            xhr.open("POST", p_url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
    }, timeout);
}

///////////////////////////
// Function to remove old widget files
function removeOldWidget() {
    // // Remove old CSS files
    // const oldCSSLinks = document.querySelectorAll('link[data-widget="inc_css_file"]');
    // oldCSSLinks.forEach((link) => {
    //     link.parentNode.removeChild(link);
    // });

    // Remove old JavaScript files
    const oldScripts = document.querySelectorAll('script[data-widget="inc_js_file"]');
    oldScripts.forEach((script) => {
        script.parentNode.removeChild(script);
    });

    if (document.querySelector(".inc_af_block") != null) {
        Array.prototype.forEach.call(document.querySelectorAll(".inc_af_block"), function (el) {
            el.parentNode.removeChild(el);
        });
    }
    if (document.querySelector(".inc_bundle_avail_block") != null) {
        Array.prototype.forEach.call(document.querySelectorAll(".inc_bundle_avail_block"), function (reme) {
            reme.parentNode.removeChild(reme);
        });
    }
    if (document.querySelector(".inc_pdp_block") == null) {
        if (document.querySelector(".inc_bundle_avail_block") != null) {
            Array.prototype.forEach.call(document.querySelectorAll(".inc_bundle_avail_block"), function (reme) {
                reme.parentNode.removeChild(reme);
            });
        }
    }
    if (document.querySelector(".inc_pdp_block") != null) {
        Array.prototype.forEach.call(document.querySelectorAll(".inc_pdp_block"), function (el) {
            el.parentNode.removeChild(el);
        });
    }

    if (document.querySelector(".inc_pdp_tick_box_block") != null) {
        Array.prototype.forEach.call(document.querySelectorAll(".inc_pdp_tick_box_block"), function (el) {
            el.parentNode.removeChild(el);
        });
    }
}

function getCookie(cookieName) {
    // Split all cookies into an array
    const cookies = document.cookie.split(";");

    // Iterate through each cookie
    for (let i = 0; i < cookies.length; i++) {
        // Split the cookie into name and value
        const cookie = cookies[i].trim().split("=");

        // Check if the cookie name matches the provided name
        if (cookie[0] === cookieName) {
            // Return the cookie value
            return decodeURIComponent(cookie[1]);
        }
    }

    // If cookie not found, return null
    return null;
}

function checkIfBothSame() {
    let same = false;
    try {
        let name = document.querySelector(".product-details-full-content meta").content.split("?")[0];
        let path = window.location.pathname;
        if (name == path) same = true;
    } catch (error) {
        if (window.location.pathname == "/cart") {
            same = true;
        } else {
            same = false;
        }
    }
    return same;
}

// Function to add new widget files
function addWidget(timeout) {
    setTimeout(() => {
        // Add new CSS file
        removeOldWidget();

        if (document.querySelectorAll('link[data-widget="inc_css_file"]').length == 0) {
            const cssFilePath = "https://usaincreasingly.increasingly.co/Implementation/t00La5S/css/T0o7u9.css?v=" + new Date().getTime();
            const linkTag = document.createElement("link");
            linkTag.rel = "stylesheet";
            linkTag.href = cssFilePath;
            linkTag.setAttribute("data-widget", "inc_css_file");
            document.querySelector("head").appendChild(linkTag);
        }

        // Add new JavaScript file

        const jsFilePath = "https://usaincreasingly.increasingly.co/Implementation/t00La5S/js/T0o7u9.js?v=" + new Date().getTime();
        const scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = jsFilePath;
        scriptTag.setAttribute("data-widget", "inc_js_file");
        document.querySelector("body").appendChild(scriptTag);
    }, timeout);
}

function pageCheck() {
    if (document.querySelector(".product-details-full")) return true;
    if (window.location.href.includes("/cart")) return true;
    if (document.querySelector('.product-details-full-main-content') != null) return true;
    if (document.querySelector('.product-details-full-content-header-title') != null) return true;
    if (document.querySelector(".template-product") != null) return true;
}

if (window.location.origin === "https://www.toolup.com") {
    if (!document.body.classList.contains('inc_location')) {
        // window.addEventListener('locationchange', function () {
        //     document.body.classList.add('inc_location')
        //     console.log('location changed!');
        //     setTimeout(function () {
        //         if (document.querySelector('.inc_js_files_' + versionUpdate + '') == null) {
        //             loadIncFiles()
        //         } else {
        //             if (document.querySelector('.inc_js_files_' + versionUpdate + '') != null) {
        //                 document.querySelector('.inc_js_files_' + versionUpdate + '').className = "c"
        //             }
        //         }
        //     }, 3000)
        // });

        // (() => {
        //     let oldPushState = history.pushState;
        //     history.pushState = function pushState() {
        //         let ret = oldPushState.apply(this, arguments);
        //         window.dispatchEvent(new Event('pushstate'));
        //         window.dispatchEvent(new Event('locationchange'));
        //         return ret;
        //     };

        //     let oldReplaceState = history.replaceState;
        //     history.replaceState = function replaceState() {
        //         let ret = oldReplaceState.apply(this, arguments);
        //         window.dispatchEvent(new Event('replacestate'));
        //         window.dispatchEvent(new Event('locationchange'));
        //         return ret;
        //     };

        //     window.addEventListener('popstate', () => {
        //         window.dispatchEvent(new Event('locationchange'))
        //     });
        // })();
    }
    // Function to handle page changes
    function handlePageChange(mutationsList, observer) {
        mutationsList.forEach((mutation) => {
            if (mutation.type === "attributes") {
                if (window.location.pathname !== window.location.oldPathname) {
                    let pageURL = window.location.pathname;
                    console.log("%cPage URL change detected:", "color: green;", pageURL);
                    window.location.oldPathname = window.location.pathname;
                    setTimeout(function () {
                        if (document.querySelector('.inc_js_files_' + versionUpdate + '') == null) {
                            loadIncFiles()
                        } else {
                            if (document.querySelector('.inc_js_files_' + versionUpdate + '') != null) {
                                document.querySelector('.inc_js_files_' + versionUpdate + '').className = "c"
                            }
                        }
                    }, 3500)
                    crawlData(3500);
                }
            }
        });
    }

    // Create a MutationObserver instance
    const observer = new MutationObserver(handlePageChange);

    // Configure the observer to observe changes to the body subtree
    const observerConfig = {
        attributes: true,
        subtree: true,
    };

    // Start observing changes to the body subtree
    setTimeout(() => {
        observer.observe(document.body, observerConfig);
    }, 1500);

    // Execute the first script once on page load
    window.location.oldPathname = window.location.pathname;

    crawlData(1000);

}
setTimeout(() => {
    if (pageCheck() == true) {
        loadIncFiles()
    }
},1000)


function loadIncFiles() {
    if (readCookie("ivid") != null) {
        if (pageCheck() == true) {
            if (document.querySelector('.inc_js_files_' + versionUpdate + '') == null) {
                function addCSSFile() {
                    var cssFilePath = "https://usaincreasingly.increasingly.co/Implementation/t00La5S/css/T0o7u9.css?v="+versionUpdate+""
                    var linkTag = document.createElement('link');
                    linkTag.rel = "stylesheet";
                    linkTag.href = cssFilePath;
                    linkTag.setAttribute('class', 'inc_css_files')
                    document.querySelector('head').appendChild(linkTag);
                }
                addCSSFile()
                var jsFilePath = "https://usaincreasingly.increasingly.co/Implementation/t00La5S/js/T0o7u9.js?v="+versionUpdate+""
                var scriptTag = document.createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.src = jsFilePath;
                scriptTag.setAttribute('class', 'inc_js_files')
                scriptTag.setAttribute('class', 'inc_js_files_' + versionUpdate + '')
                document.querySelector('body').appendChild(scriptTag);
                setTimeout(function () {
                    if (document.querySelector('.inc_js_files_' + versionUpdate + '') != null) {
                        document.querySelector('.inc_js_files_' + versionUpdate + '').className = "c"
                    }
                }, 1500)
            }
        }
    }
}