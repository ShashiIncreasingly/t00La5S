function crawlData() {

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

    const seachForSKUinHTML = () => {
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

        if (specialBadge && specialBadge.innerText.includes(specialText)) {
            finalText = specialText;
        } else if (!specialBadge && saleBadge && saleBadge.innerText.includes(saleText)) {
            finalText = saleText;
        }

        return finalText;
    }

    function getPrice() {
        let client_active_price = null;
        let client_special_price = null;

        client_active_price = document.querySelector(".product-views-msrp") ? parseNumbersFromString(document.querySelector(".product-views-msrp").innerText).toFixed(2).toString() : 0;
        client_special_price = parseNumbersFromString(document.querySelector(".product-views-price-lead").innerText).toFixed(2).toString();

        
        return [client_active_price, client_special_price];
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
    let oosproduct = document.querySelector(".product-line-stock-msg-out-text") ? 0 : 100;

    var format_json_data = JSON.stringify({
        event_data: {
            product_id: product_id,
            promotional_message: promo,
            product_price: clientActivePrice,
            special_price: clientSpecialPrice,
            field4: rating,
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
    console.log(format_json_data)
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
crawlData();
