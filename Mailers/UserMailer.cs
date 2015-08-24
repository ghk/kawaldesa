using ActionMailerNext.MandrillMailSender;
using ActionMailerNext.Mvc5;
using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace App.Mailers
{
    public class UserMailer: MailerBase
    {
        public UserMailer()
        {
            //Choosing the Email method (SMTP, Mandrill, etc..)
            //SetMailMethod(MailMethod.Mandrill);
            MailSender = new MandrillMailSender();
        }

        public EmailResult Invitation(InvitationToken token)
        {
            // Setting up needed properties
            MailAttributes.From = new MailAddress("ghk@gozalikumara.com", "Gozali Kumara");
            MailAttributes.To.Add(new MailAddress(token.User.Email));
            MailAttributes.Subject = "Undangan bergabung dengan kawaldesa";
            MailAttributes.Priority = MailPriority.High;

            //Calling the view which form the email body
            return Email("Invitation", token);
        }
    }

}