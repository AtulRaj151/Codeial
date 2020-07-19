const queue = require('../config/kue');
const commentMailer = require('../mailers/comment_mailer');

queue.process('emails',function(job,done){
       console.log("Emails Worker is Processing a Job ",job.data);

       commentMailer.newComment(job.data);

       done();
})