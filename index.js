function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createQR() {

    function modifyDOM() {
        let amount = document.querySelector("div.css-arolzm > div > div:nth-child(2)").textContent

        let info = document.querySelectorAll("div.css-1loa1h5 > div > div")

        let list = []

        list.push(amount)

        info.forEach(item => {
            if (!item.querySelector("div > div")) { return }
            if (item.querySelector("div > div").textContent == "Nội dung chuyển khoản") {
                list.push(item.querySelector("div:nth-child(2) > div").textContent)
            }
            if (item.querySelector("div > div").textContent == "Tên ngân hàng") {
                list.push(item.querySelector("div:nth-child(2) > div").textContent.toLocaleLowerCase())
            }
            if (item.querySelector("div > div").textContent == "Số tài khoản/Số thẻ") {
                list.push(item.querySelector("div:nth-child(2) > div").textContent)
            }
        });

        return list
    };

    function formatAmount(value) {
        return Number(value.replaceAll(",", "").replace("₫ ", "")).toFixed(0)
    }

    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();'
    }, (results) => {

        console.log(results[0]);

        let bank = ""

        banks.forEach(item => {
            let shortName = item.shortName.toLocaleLowerCase()
            let code = item.code.toLocaleLowerCase()
            let text = results[0][2].replaceAll(" ", "")

            if (text.includes(shortName) || text.includes(code)) {
                bank = item.shortName
            }
        });

        if (document.getElementById("bank").value) {
            bank = document.getElementById("bank").value
        }

        if (!bank) {
            document.getElementById("bank").style.display = "block";
            document.getElementById("alert").style.display = "block";
            return
        }

        let img = `https://img.vietqr.io/image/${bank}-${results[0][3]}-compact2.jpg?amount=${formatAmount(results[0][0])}&addInfo=${results[0][1]}&accountName=QR`
        document.getElementById("img").src = img
    });

}


document.querySelector("#create").onclick = function () {
    createQR()
};

document.getElementById("bank").addEventListener("change", () => {
    createQR()
})


let banks = [
    {
        "id": 17,
        "name": "Ngân hàng TMCP Công thương Việt Nam",
        "code": "ICB",
        "shortName": "VietinBank",
    },
    {
        "id": 43,
        "name": "Ngân hàng TMCP Ngoại Thương Việt Nam",
        "code": "VCB",
        "shortName": "Vietcombank",
    },
    {
        "id": 4,
        "name": "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
        "code": "BIDV",
        "shortName": "BIDV",
    },
    {
        "id": 42,
        "name": "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam",
        "code": "VBA",
        "shortName": "Agribank",
    },
    {
        "id": 26,
        "name": "Ngân hàng TMCP Phương Đông",
        "code": "OCB",
        "shortName": "OCB",
    },
    {
        "id": 21,
        "name": "Ngân hàng TMCP Quân đội",
        "code": "MB",
        "shortName": "MBBank",
    },
    {
        "id": 38,
        "name": "Ngân hàng TMCP Kỹ thương Việt Nam",
        "code": "TCB",
        "shortName": "Techcombank",
    },
    {
        "id": 2,
        "name": "Ngân hàng TMCP Á Châu",
        "code": "ACB",
        "shortName": "ACB",
    },
    {
        "id": 47,
        "name": "Ngân hàng TMCP Việt Nam Thịnh Vượng",
        "code": "VPB",
        "shortName": "VPBank",
    },
    {
        "id": 39,
        "name": "Ngân hàng TMCP Tiên Phong",
        "code": "TPB",
        "shortName": "TPBank",
    },
    {
        "id": 36,
        "name": "Ngân hàng TMCP Sài Gòn Thương Tín",
        "code": "STB",
        "shortName": "Sacombank",
    },
    {
        "id": 12,
        "name": "Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh",
        "code": "HDB",
        "shortName": "HDBank",
    },
    {
        "id": 44,
        "name": "Ngân hàng TMCP Bản Việt",
        "code": "VCCB",
        "shortName": "VietCapitalBank",
    },
    {
        "id": 31,
        "name": "Ngân hàng TMCP Sài Gòn",
        "code": "SCB",
        "shortName": "SCB",
    },
    {
        "id": 45,
        "name": "Ngân hàng TMCP Quốc tế Việt Nam",
        "code": "VIB",
        "shortName": "VIB",
    },
    {
        "id": 35,
        "name": "Ngân hàng TMCP Sài Gòn - Hà Nội",
        "code": "SHB",
        "shortName": "SHB",
    },
    {
        "id": 10,
        "name": "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam",
        "code": "EIB",
        "shortName": "Eximbank",
    },
    {
        "id": 22,
        "name": "Ngân hàng TMCP Hàng Hải",
        "code": "MSB",
        "shortName": "MSB",
    },
    {
        "id": 53,
        "name": "TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by VPBank",
        "code": "CAKE",
        "shortName": "CAKE",
    },
    {
        "id": 54,
        "name": "TMCP Việt Nam Thịnh Vượng - Ngân hàng số Ubank by VPBank",
        "code": "Ubank",
        "shortName": "Ubank",
    },
    {
        "id": 58,
        "name": "Ngân hàng số Timo by Ban Viet Bank (Timo by Ban Viet Bank)",
        "code": "TIMO",
        "shortName": "Timo",
    },
    {
        "id": 57,
        "name": "Viettel Money",
        "code": "VTLMONEY",
        "shortName": "ViettelMoney",
    },
    {
        "id": 56,
        "name": "VNPT Money",
        "code": "VNPTMONEY",
        "shortName": "VNPTMoney",
    },
    {
        "id": 34,
        "name": "Ngân hàng TMCP Sài Gòn Công Thương",
        "code": "SGICB",
        "shortName": "SaigonBank",
    },
    {
        "id": 3,
        "name": "Ngân hàng TMCP Bắc Á",
        "code": "BAB",
        "shortName": "BacABank",
    },
    {
        "id": 30,
        "name": "Ngân hàng TMCP Đại Chúng Việt Nam",
        "code": "PVCB",
        "shortName": "PVcomBank",
    },
    {
        "id": 27,
        "name": "Ngân hàng Thương mại TNHH MTV Đại Dương",
        "code": "Oceanbank",
        "shortName": "Oceanbank",
    },
    {
        "id": 24,
        "name": "Ngân hàng TMCP Quốc Dân",
        "code": "NCB",
        "shortName": "NCB",
    },
    {
        "id": 37,
        "name": "Ngân hàng TNHH MTV Shinhan Việt Nam",
        "code": "SHBVN",
        "shortName": "ShinhanBank",
    },
    {
        "id": 1,
        "name": "Ngân hàng TMCP An Bình",
        "code": "ABB",
        "shortName": "ABBANK",
    },
    {
        "id": 41,
        "name": "Ngân hàng TMCP Việt Á",
        "code": "VAB",
        "shortName": "VietABank",
    },
    {
        "id": 23,
        "name": "Ngân hàng TMCP Nam Á",
        "code": "NAB",
        "shortName": "NamABank",
    },
    {
        "id": 29,
        "name": "Ngân hàng TMCP Xăng dầu Petrolimex",
        "code": "PGB",
        "shortName": "PGBank",
    },
    {
        "id": 46,
        "name": "Ngân hàng TMCP Việt Nam Thương Tín",
        "code": "VIETBANK",
        "shortName": "VietBank",
    },
    {
        "id": 5,
        "name": "Ngân hàng TMCP Bảo Việt",
        "code": "BVB",
        "shortName": "BaoVietBank",
    },
    {
        "id": 33,
        "name": "Ngân hàng TMCP Đông Nam Á",
        "code": "SEAB",
        "shortName": "SeABank",
    },
    {
        "id": 52,
        "name": "Ngân hàng Hợp tác xã Việt Nam",
        "code": "COOPBANK",
        "shortName": "COOPBANK",
    },
    {
        "id": 20,
        "name": "Ngân hàng TMCP Bưu Điện Liên Việt",
        "code": "LPB",
        "shortName": "LienVietPostBank",
    },
    {
        "id": 19,
        "name": "Ngân hàng TMCP Kiên Long",
        "code": "KLB",
        "shortName": "KienLongBank",
    },
    {
        "id": 55,
        "name": "Ngân hàng Đại chúng TNHH Kasikornbank",
        "code": "KBank",
        "shortName": "KBank",
    },
    {
        "id": 48,
        "name": "Ngân hàng Liên doanh Việt - Nga",
        "code": "VRB",
        "shortName": "VRB",
    },
    {
        "id": 8,
        "name": "DBS Bank Ltd - Chi nhánh Thành phố Hồ Chí Minh",
        "code": "DBS",
        "shortName": "DBSBank",
    },
    {
        "id": 49,
        "name": "Ngân hàng TNHH MTV Woori Việt Nam",
        "code": "WVN",
        "shortName": "Woori",
    },
    {
        "id": 50,
        "name": "Ngân hàng Kookmin - Chi nhánh Hà Nội",
        "code": "KBHN",
        "shortName": "KookminHN",
    },
    {
        "id": 51,
        "name": "Ngân hàng Kookmin - Chi nhánh Thành phố Hồ Chí Minh",
        "code": "KBHCM",
        "shortName": "KookminHCM",
    },
    {
        "id": 6,
        "name": "Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam",
        "code": "CBB",
        "shortName": "CBBank",
    },
    {
        "id": 25,
        "name": "Ngân hàng Nonghyup - Chi nhánh Hà Nội",
        "code": "NHB HN",
        "shortName": "Nonghyup",
    },
    {
        "id": 7,
        "name": "Ngân hàng TNHH MTV CIMB Việt Nam",
        "code": "CIMB",
        "shortName": "CIMB",
    },
    {
        "id": 9,
        "name": "Ngân hàng TMCP Đông Á",
        "code": "DOB",
        "shortName": "DongABank",
    },
    {
        "id": 11,
        "name": "Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu",
        "code": "GPB",
        "shortName": "GPBank",
    },
    {
        "id": 13,
        "name": "Ngân hàng TNHH MTV Hong Leong Việt Nam",
        "code": "HLBVN",
        "shortName": "HongLeong",
    },
    {
        "id": 40,
        "name": "Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh",
        "code": "UOB",
        "shortName": "UnitedOverseas",
    },
    {
        "id": 14,
        "name": "Ngân hàng TNHH MTV HSBC (Việt Nam)",
        "code": "HSBC",
        "shortName": "HSBC",
    },
    {
        "id": 15,
        "name": "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội",
        "code": "IBK - HN",
        "shortName": "IBKHN",
    },
    {
        "id": 28,
        "name": "Ngân hàng TNHH MTV Public Việt Nam",
        "code": "PBVN",
        "shortName": "PublicBank",
    },
    {
        "id": 16,
        "name": "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh",
        "code": "IBK - HCM",
        "shortName": "IBKHCM",
    },
    {
        "id": 18,
        "name": "Ngân hàng TNHH Indovina",
        "code": "IVB",
        "shortName": "IndovinaBank",
    },
    {
        "id": 32,
        "name": "Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam",
        "code": "SCVN",
        "shortName": "StandardChartered",
    }
]

banks.forEach(item => {
    const node = document.createElement("option");
    node.setAttribute("value", item.shortName);
    document.getElementById("banks").appendChild(node);
});