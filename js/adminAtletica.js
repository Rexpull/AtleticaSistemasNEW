
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
});

$(document).ready(() => {
    $('#addEmployeeModal form').submit(async e => {
        e.preventDefault();
        $('#addEmployeeModal').modal('hide');
        await membrosCollection.add({
            nome: $('#addEmployeeModal #formNome').val() || '',
            apelido: $('#addEmployeeModal #formApelido').val() || '',
            cargo: $('#addEmployeeModal #formCargo').val() || '',
            link: $('#addEmployeeModal #formLink').val() || '',
        });
        window.location.reload();
    });
})