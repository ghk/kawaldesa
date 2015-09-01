using ActionMailerNext.Implementations.SMTP;
using ActionMailerNext.Mvc5;
using App.Models;
using App.Utils.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace App.Mailers
{
    public class UserMailer: MailerBase
    {
        public UserMailer()
        {
            MailSender = new MandrillMailSender();
        }

        public EmailResult Invitation(InvitationToken token)
        {
            // Setting up needed properties
            MailAttributes.From = new MailAddress("kawaldesa@caturan.com", "Kawal Desa");
            MailAttributes.To.Add(new MailAddress(token.User.Email));
            MailAttributes.Subject = "Undangan bergabung dengan kawaldesa";
            MailAttributes.Priority = MailPriority.High;

            //Calling the view which form the email body
            return Email("Invitation", token);
        }
    }

}