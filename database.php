<?php

$koneksi = mysqli_connect('localhost', 'root', 'root', 'mahasiswa');
$data = json_decode(file_get_contents("php://input"));
$request = $data->request;

if ($request == 1) {
    $sql = mysqli_query($koneksi, "SELECT * FROM profile");
    $response = array();
    while ($row = mysqli_fetch_assoc($sql)) {
        $response[] = $row;
    }
    echo json_encode($response);
    exit;
}

if ($request == 2) {
    $id = $data->id;
    $sql = mysqli_query($koneksi, "DELETE FROM profile WHERE id=" . $id);
    exit;
}

if ($request == 3) {
    $nim = $data->nim;
    $nama = $data->nama;
    $jk = $data->jk;
    $prodi = $data->prodi;
    $sql = mysqli_query($koneksi, "INSERT INTO profile (nim, nama, jk, prodi) VALUES ('$nim', '$nama', '$jk', '$prodi')");
    if ($sql) {
        echo json_encode(["id" => mysqli_insert_id($koneksi), "nim" => $nim, "nama" => $nama, "jk" => $jk, "prodi" => $prodi]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to insert data"]);
    }
    exit;
}

if ($request == 4) {
    $id = $data->id;
    $nim = $data->nim;
    $nama = $data->nama;
    $jk = $data->jk;
    $prodi = $data->prodi;
    $sql = mysqli_query($koneksi, "UPDATE profile SET nim='$nim', nama='$nama', jk='$jk', prodi='$prodi' WHERE id=" . $id);
    if ($sql) {
        echo json_encode(["id" => $id, "nim" => $nim, "nama" => $nama, "jk" => $jk, "prodi" => $prodi]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update data"]);
    }
    exit;
}

?>
