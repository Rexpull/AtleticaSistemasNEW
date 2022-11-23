// CRUD Atlética

const membrosCollection = firebase.firestore().collection('membros');
const membrosPhotosStorage = firebase.storage().ref().child('membros');

membrosCollection.get().then((querySnapshot) => {
    $('#tabelaMembrosAtletica tbody').html();
    querySnapshot.docs.forEach((doc) => {
        const json = doc.data();

        const row = $('<tr/>');
        row.append(`<td><img src="${json.imagem}" alt="Foto"></td>`);
        row.append(`<td>${json.nome}</td>`);
        row.append(`<td>${json.apelido}</td>`);
        row.append(`<td>${json.cargo}</td>`);
        row.append(`<td><a href="${json.link}">${json.link ? 'Link' : ''}</a></td>`);
        row.append(`<td>
            <a href="#addEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
                    data-toggle="tooltip" title="Editar">&#xE254;</i></a>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i
                    class="material-icons" data-toggle="tooltip" title="Remover">&#xE872;</i></a>
        </td>`);
        row.data('id', doc.id);
        row.data('data', json);

        $('#tabelaMembrosAtletica tbody').append(row);
    });
    $('#tabelaMembrosAtletica tbody .edit').click(function() {
        const id = $(this).closest('tr').data('id');
        const data = $(this).closest('tr').data('data');
        $('#addEmployeeModal').data('id', id);
        $('#addEmployeeModal').data('imagem', data.imagem);
        $('#addEmployeeModal #formNome').val(data.nome);
        $('#addEmployeeModal #formApelido').val(data.apelido);
        $('#addEmployeeModal #formCargo').val(data.cargo);
        $('#addEmployeeModal #formLink').val(data.link);
    });
    $('#tabelaMembrosAtletica tbody .delete').click(function() {
        const id = $(this).closest('tr').data('id');
        $('#deleteEmployeeModal').data('id', id);
    });
});

$(document).ready(() => {
    $('#addMembroBtn').click(() => {
        $('#addEmployeeModal').data('id', null);
        $('#addEmployeeModal').data('imagem', null);
        $('#addEmployeeModal #formNome').val(null);
        $('#addEmployeeModal #formApelido').val(null);
        $('#addEmployeeModal #formCargo').val(null);
        $('#addEmployeeModal #formLink').val(null);
    });

    $('#addEmployeeModal #formPhoto').change(e => {
        $('#addEmployeeModal input[type=submit]').attr('disabled', true);
        const file = e.target.files[0];
        membrosPhotosStorage.child(uuidv4()).put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                $('#addEmployeeModal').data('imagem', url);
                $('#addEmployeeModal input[type=submit]').attr('disabled', null);
            })
        });
    });

    $('#addEmployeeModal form').submit(async e => {
        e.preventDefault();
        $('#addEmployeeModal').modal('hide');
        const id = $('#addEmployeeModal').data('id');
        const data = {
            nome: $('#addEmployeeModal #formNome').val() || '',
            apelido: $('#addEmployeeModal #formApelido').val() || '',
            cargo: $('#addEmployeeModal #formCargo').val() || '',
            link: $('#addEmployeeModal #formLink').val() || '',
            imagem: $('#addEmployeeModal').data('imagem') || '',
        };
        if (id)
            await membrosCollection.doc(id).set(data);
        else
            await membrosCollection.add(data);
        window.location.reload();
    });

    $('#deleteEmployeeModal form').submit(async e => {
        e.preventDefault();
        $('#deleteEmployeeModal').modal('hide');
        const id = $('#deleteEmployeeModal').data('id');
        if (id) {
            await membrosCollection.doc(id).delete();
        }
        window.location.reload();
    });
})


// CRUD Produtos

const produtosCollection = firebase.firestore().collection('produtos');
const produtosPhotosStorage = firebase.storage().ref().child('produtos');

produtosCollection.get().then((querySnapshot) => {
    $('#tabelaProdutos tbody').html();
    querySnapshot.docs.forEach((doc) => {
        const json = doc.data();

        const row = $('<tr/>');
        row.append(`<td><img src="${json.imagem}" alt="Foto"></td>`);
        row.append(`<td>${json.nome}</td>`);
        row.append(`<td>${json.preco}</td>`);
        row.append(`<td>
            <a href="#addProductModal" class="edit" data-toggle="modal"><i class="material-icons"
                    data-toggle="tooltip" title="Editar">&#xE254;</i></a>
            <a href="#deleteProductModal" class="delete" data-toggle="modal"><i
                    class="material-icons" data-toggle="tooltip" title="Remover">&#xE872;</i></a>
        </td>`);
        row.data('id', doc.id);
        row.data('data', json);

        $('#tabelaProdutos tbody').append(row);
    });
    $('#tabelaProdutos tbody .edit').click(function() {
        const id = $(this).closest('tr').data('id');
        const data = $(this).closest('tr').data('data');
        $('#addProductModal').data('id', id);
        $('#addProductModal').data('imagem', data.imagem);
        $('#addProductModal #formNome').val(data.nome);
        $('#addProductModal #formPreco').val(data.preco);
    });
    $('#tabelaProdutos tbody .delete').click(function() {
        const id = $(this).closest('tr').data('id');
        $('#deleteProductModal').data('id', id);
    });
});

$(document).ready(() => {
    $('#addProductBtn').click(() => {
        $('#addProductModal').data('id', null);
        $('#addProductModal').data('imagem', null);
        $('#addProductModal #formNome').val(null);
        $('#addProductModal #formPreco').val(null);
    });

    $('#addProductModal #formPhoto').change(e => {
        $('#addProductModal input[type=submit]').attr('disabled', true);
        const file = e.target.files[0];
        produtosPhotosStorage.child(uuidv4()).put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                $('#addProductModal').data('imagem', url);
                $('#addProductModal input[type=submit]').attr('disabled', null);
            })
        });
    });

    $('#addProductModal form').submit(async e => {
        e.preventDefault();
        $('#addProductModal').modal('hide');
        const id = $('#addProductModal').data('id');
        const data = {
            nome: $('#addProductModal #formNome').val() || '',
            preco: $('#addProductModal #formPreco').val() || '',
            imagem: $('#addProductModal').data('imagem') || '',
        };
        if (id)
            await produtosCollection.doc(id).set(data);
        else
            await produtosCollection.add(data);
        window.location.reload();
    });

    $('#deleteProductModal form').submit(async e => {
        e.preventDefault();
        $('#deleteProductModal').modal('hide');
        const id = $('#deleteProductModal').data('id');
        if (id) {
            await produtosCollection.doc(id).delete();
        }
        window.location.reload();
    });
})

// Utils

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
