let dataProduk = [
    {
        nama: "Pizza",
        kode: "BRG001",
    },
    {
        nama: "Burger",
        kode: "BRG002",
    },
    {
        nama: "Kentang Goreng",
        kode: "BRG003",
    },
    {
        nama: "Kebab",
        kode: "BRG004",
    },
    {
        nama: "Spaghetti",
        kode: "BRG005",
    },
    {
        nama: "Ramen",
        kode: "BRG006",
    },
    {
        nama: "Sushi",
        kode: "BRG007",
    },
    {
        nama: "Salad",
        kode: "BRG008",
    },
    {
        nama: "Nasi Goreng",
        kode: "BRG009",
    },
    {
        nama: "Nasi Kuning",
        kode: "BRG010",
    }
]

let dataBahan = [
    {
        nama: "Daging",
        kode: "BHN001",
        qty: 10
    },
    {
        nama: "Keju",
        kode: "BHN002",
        qty: 10
    },
    {
        nama: "Telur",
        kode: "BHN003",
        qty: 10
    },
    {
        nama: "Saus",
        kode: "BHN004",
        qty: 10
    },
    {
        nama: "Sayuran",
        kode: "BHN005",
        qty: 10
    },
    {
        nama: "Bawang",
        kode: "BHN006",
        qty: 10
    },
    {
        nama: "Beras",
        kode: "BHN007",
        qty: 10
    },
    {
        nama: "Tepung",
        kode: "BHN008",
        qty: 10
    },
    {
        nama: "Gula",
        kode: "BHN009",
        qty: 10
    },
    {
        nama: "Garam",
        kode: "BHN010",
        qty: 10
    }
]

let dataPesanan = {}
let dataPesananProduk = {}
let dataPesananBahan = {}

function tambahProduk(kode)
{
    let produk = dataProduk.find(produk => produk.kode == kode)
    dataPesananProduk = {
        kode: produk.kode,
        nama: produk.nama,
    }

    $("#nama-produk").val(produk.nama)
    $("#kode-produk").val(produk.kode)
    $("#qty-produk").val(1)
}

function tambahBahan(kode)
{
    if(dataPesananProduk.kode == undefined)
    {
        alert("Pilih Produk Terlebih Dahulu")
        return
    }
    let bahan = dataBahan.find(bahan => bahan.kode == kode)
    dataPesananBahan = {
        kode: bahan.kode,
        nama: bahan.nama,
        qty: bahan.qty
    }

    $("#nama-bahan").val(bahan.nama)
    $("#kode-bahan").val(bahan.kode)
    $("#qty-bahan").val(bahan.qty)
}


function processPesanan()
{
    // cek jika dataPesanan masih kosong maka buat dataPesanan
    if(dataPesananProduk.kode == undefined)
    {
        alert("Pilih Produk Terlebih Dahulu")
        return
    }
    if(dataPesanan.kode == undefined)
    {
        dataPesanan = {
            nama: dataPesananProduk.nama,
            kode: dataPesananProduk.kode,
            qty: $("#qty-produk").val(),
            bahan: [
                {
                    nama: dataPesananBahan.nama,
                    kode: dataPesananBahan.kode,
                    qty: dataPesananBahan.qty
                }
            ]
        }
    }
    // jika produk sama dan bahannya sama maka alert
    else if(dataPesanan.kode == dataPesananProduk.kode && dataPesanan.bahan.find(bahan => bahan.kode == dataPesananBahan.kode)){
        alert("Bahan Sudah Ada")
        return
    }
    // jika produk sama tapi bahannya beda maka tambahkan bahannya
    else if(dataPesanan.kode == dataPesananProduk.kode && dataPesanan.bahan.find(bahan => bahan.kode != dataPesananBahan.kode)){
        dataPesanan.bahan.push(dataPesananBahan)
    }
    // jika produknya beda maka buat object baru dengan bahannya
    else{
        dataPesanan = {
            nama: dataPesananProduk.nama,
            kode: dataPesananProduk.kode,
            qty: $("#qty-produk").val(),
            bahan: [
                {
                    nama: dataPesananBahan.nama,
                    kode: dataPesananBahan.kode,
                    qty: dataPesananBahan.qty
                }
            ]
        }
    }
    
    // tampilkan data bahan sesuai jumlah bahan yang ada
    $(".daftar-bahan").html("")
    dataPesanan.bahan.forEach(bahan => {
        $(".daftar-bahan").append(
            `
            <div class="daftar-bahan-output row mb-3">
                <div class="col-3">
                    <input type="text" class="form-control" readonly value="${bahan.nama}">
                </div>
                <div class="col-3">
                    <input type="text" class="form-control" readonly value="${bahan.kode}">
                </div>
                <div class="col-3">
                    <input type="number" class="form-control" value="${bahan.qty}" id="qty-daftar-bahan-${bahan.kode}">
                </div>
                <div class="col-1">
                    <button class="btn btn-sm btn-danger" onclick="hapusBahan('${bahan.kode}')">X</button>
                </div>
            </div>
            `
        )
        // jika qty-daftar-bahan-<kode> keyup dan lebih dari qty bahan maka alert
        $(`#qty-daftar-bahan-${bahan.kode}`).keyup(function(){
            if($(`#qty-daftar-bahan-${bahan.kode}`).val() > bahan.qty)
            {
                alert("Qty Melebihi Stok")
                $(`#qty-daftar-bahan-${bahan.kode}`).val(bahan.qty)
            }
        })
    })

}

function hapusBahan(kode)
{
    dataPesanan.bahan = dataPesanan.bahan.filter(bahan => bahan.kode != kode)
    $(".daftar-bahan").html("")
    dataPesanan.bahan.forEach(bahan => {
        $(".daftar-bahan").append(
            `
            <div class="daftar-bahan-output row mb-3">
                <div class="col-3">
                    <input type="text" class="form-control" readonly value="${bahan.nama}">
                </div>
                <div class="col-3">
                    <input type="text" class="form-control" readonly value="${bahan.kode}">
                </div>
                <div class="col-3">
                    <input type="number" class="form-control" value="${bahan.qty}" id="qty-daftar-bahan-${bahan.kode}">
                </div>
                <div class="col-1">
                    <button class="btn btn-sm btn-danger" onclick="hapusBahan('${bahan.kode}')">X</button>
                </div>
            </div>
            `
        )

        // 
    })
}

function cetakPesanan()
{
    if(dataPesanan.kode == undefined || dataPesanan.bahan.length == 0)
    {
        alert("Pilih Produk Terlebih Dahulu")
        return
    }
    $("#modalCetak").modal("show")
    $("#nama-pesanan").html(dataPesanan.nama)
    $("#kode-pesanan").html(dataPesanan.kode)
    $("#qty-pesanan").html($("#qty-produk").val())
    $("#element-pesanan-bahan").html("")
    dataPesanan.bahan.forEach(bahan => {
        $("#element-pesanan-bahan").append(
            `
            <tr>
                <td>${bahan.nama}</td>
                <td>${bahan.kode}</td>
                <td>${$(`#qty-daftar-bahan-${bahan.kode}`).val()}</td>
            </tr>
            `
        )
    })
}


function showModalProduk()
{
    $("#modalProduk").modal("show");
    dataProduk.forEach(produk => {
        $("#element-produk").append(
            `
                <tr>
                    <td>${produk.nama}</td>
                    <td>${produk.kode}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" data-bs-dismiss="modal" onclick="tambahProduk('${produk.kode}')">+</button>
                    </td>
                </tr>
            `
        )
    });
}

function showModalBahan()
{
    $("#modalBahan").modal("show");
    // $("#modalBahan").modal("show");

    dataBahan.forEach(bahan => {
        $("#element-bahan").append(
            `
                <tr>
                    <td>${bahan.nama}</td>
                    <td>${bahan.kode}</td>
                    <td>${bahan.qty}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" data-bs-dismiss="modal" onclick="tambahBahan('${bahan.kode}')">+</button>
                    </td>
                </tr>
            `
        )
    });
}