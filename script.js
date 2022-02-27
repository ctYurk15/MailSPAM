$(document).ready(function(){
    console.log('Hello from JQuery!');

    const log_message_refence = $("#referenceMessageContainer");

    function getCurrentTime()
    {
        const today_time = new Date();
        return today_time.getHours()+':'+
                today_time.getMinutes()+':'+
                today_time.getSeconds();
    }

    function log(message)
    {
        const new_message = $(log_message_refence).clone();
        
        $(new_message).removeClass('hidden');
        $(new_message).html(getCurrentTime()+' '+message+'...');
        $(new_message).addClass('log_message');

        $("#logMessageContainer").append($(new_message));
    }

    $("#mailForm").submit(function(event){

        event.preventDefault();

        const mail_form_data = new FormData(document.getElementById("mailForm"));
        mail_form_data.set('sender_name', 10);
        const rounds_count = 1;
        /*
            alert('Intercepted!');
            console.log(mail_form_data);
        */
        log('Ініціювання скрипта...');
        for(let i = 0; i < rounds_count; i++)
        {
            log('Початок раунду '+(i+1));
            $.post('server.php',
                {
                    'receiver_email': mail_form_data.get('receiver_email'),
                    'sender_email': mail_form_data.get('sender_email'),
                    'sender_password': mail_form_data.get('sender_password'),
                    'sender_name': mail_form_data.get('sender_name'),
                    'mails_per_round': mail_form_data.get('sender_name'),
                    'time_between_mails': 0.1
                },
                function(result){
                    log('Кінець раунду '+(i+1)+'. Загальна кількість листів: '+(i+1)*(mail_form_data.get('sender_name')));
                    console.log(result);
                }
            );
        }

        

    });
});