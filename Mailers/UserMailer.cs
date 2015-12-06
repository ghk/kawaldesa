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
            String currentDomain = Request.Url.Host.ToLower();
            if (Request.Url.Port != 80)
                currentDomain = currentDomain + ":" + Request.Url.Port;
            // Setting up needed properties
            MailAttributes.From = new MailAddress("kawaldesa@caturan.com", "Kawal Desa");
            MailAttributes.To.Add(new MailAddress(token.User.Email));
            MailAttributes.Subject = "Undangan bergabung dengan kawaldesa";
            MailAttributes.Priority = MailPriority.High;

            //Calling the view which form the email body
            var invitation = new Invitation
            {
                Token = token,
                CurrentDomain = currentDomain

            };
            return Email("Invitation", invitation);
        }
    }

    public class Invitation
    {
        public InvitationToken Token { get; set; }
        public string CurrentDomain { get; set; }
    }

}