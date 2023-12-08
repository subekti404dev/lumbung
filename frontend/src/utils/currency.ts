/* eslint-disable no-extra-boolean-cast */
/* eslint-disable prefer-const */
export const formatRupiah = (angka: number | string, prefix?: boolean) => {
  if (typeof angka === "number") {
    angka = angka.toString();
  }
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = !!split[1] ? rupiah + "," + split[1] : rupiah;
  return prefix ? (rupiah ? "Rp " + rupiah : "") : rupiah;
};
