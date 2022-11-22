
const membrosCollection = firebase.firestore().collection('membros');

membrosCollection.get().then((querySnapshot) => {
    $('#tabelaMembrosAtletica tbody').html();
    querySnapshot.docs.forEach((doc) => {
        const membroJson = doc.data();

        const row = $('<tr/>');
        row.append(`<td><img src="${membroJson.imagem}" alt="Foto"></td>`);
        row.append(`<td>${membroJson.nome}</td>`);
        row.append(`<td>${membroJson.apelido}</td>`);
        row.append(`<td>${membroJson.cargo}</td>`);
        row.append(`<td><a href="${membroJson.link}">${membroJson.link ? 'Link' : ''}</a></td>`);
        row.append(`<td>
            <a href="#addEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
                    data-toggle="tooltip" title="Editar">&#xE254;</i></a>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i
                    class="material-icons" data-toggle="tooltip" title="Remover">&#xE872;</i></a>
        </td>`);
        row.data('id', doc.id);
        row.data('data', membroJson);

        $('#tabelaMembrosAtletica tbody').append(row);
    });
    $('#tabelaMembrosAtletica tbody .edit').click(function() {
        const id = $(this).closest('tr').data('id');
        const data = $(this).closest('tr').data('data');
        $('#addEmployeeModal').data('id', id);
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
        $('#addEmployeeModal #formNome').val(null);
        $('#addEmployeeModal #formApelido').val(null);
        $('#addEmployeeModal #formCargo').val(null);
        $('#addEmployeeModal #formLink').val(null);
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