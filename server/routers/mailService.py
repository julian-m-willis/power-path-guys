import os
import requests

def send_welcome_email(recipient_name, recipient_email):
    MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
    MAILGUN_DOMAIN_NAME = os.getenv("MAILGUN_DOMAIN_NAME")
    
    html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to PowerPathGuys</title>
            <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #121212;
                color: #c1ff72;
                font-family: "Arial", sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
                background-image: url("https://live.staticflickr.com/65535/54136957443_0e669639ef_b.jpg");
                background-size: cover;
                background-position: center;
                padding: 40px 20px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            }
            .overlay {
                background: rgba(0, 0, 0, 0.6);
                padding: 20px;
                border-radius: 10px;
            }
            .header {
                font-size: 36px;
                margin-bottom: 10px;
                color: #c1ff72;
            }
            .sub-header {
                font-size: 18px;
                margin-bottom: 20px;
                color: #ffffff;
            }
            .cta-button {
                display: inline-block;
                background-color: #c1ff72;
                color: #121212;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 30px;
                font-weight: bold;
                margin-top: 20px;
            }
            .content-section {
                margin-top: 30px;
                color: #ffffff;
                text-align: left;
                font-size: 16px;
            }
            .footer {
                margin-top: 30px;
                padding: 20px;
                background-color: #1d1d1d;
                border-radius: 10px;
                color: #c1ff72;
                text-align: center;
            }
            .social-icons img {
                width: 30px;
                height: 30px;
                margin: 0 10px;
            }
            @media only screen and (max-width: 600px) {
                .header {
                font-size: 28px;
                }
                .sub-header {
                font-size: 16px;
                }
                .container {
                padding: 20px 10px;
                }
                .social-icons img {
                width: 24px;
                height: 24px;
                }
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="overlay">
                <h1 class="header">Welcome, {{NAME}}!</h1>
                <p class="sub-header">
                We’re excited to have you on board! Track your workouts, plan
                routines, monitor your diet, and enjoy personalized training guidance.
                Let's get moving!
                </p>
                <a href="YOUR_CALL_TO_ACTION_LINK" class="cta-button"
                >Start Your Journey</a
                >

                <div class="content-section">
                <p>With our app, you can easily:</p>
                <ul>
                    <li>Track your daily workouts and measure progress.</li>
                    <li>Plan personalized workout routines that fit your goals.</li>
                    <li>
                    Stay on top of your diet and nutrition with our diet tracker.
                    </li>
                    <li>
                    Get personalized training advice to achieve your fitness
                    milestones.
                    </li>
                </ul>
                <p>
                    We are thrilled to have you join our community of fitness
                    enthusiasts!
                </p>
                </div>

                <div class="footer">
                <p>Follow us on:</p>
                <div class="social-icons">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                    />
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
                    alt="Twitter"
                    />
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                    />
                </div>
                <p>&copy; 2024 POWER PATH GUYS. All rights reserved.</p>
                </div>
            </div>
            </div>
        </body>
        </html>
    """.replace("{{NAME}}", recipient_name)
    
    response =  requests.post(
        f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN_NAME}/messages",
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": "Power Path Guys <mailgun@{MAILGUN_DOMAIN_NAME}>",
            "to": [recipient_email],
            "subject": "Welcome to Power Path Guys!",
            "html": html_content
        })

    # Print the response status code and body
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)
    
    return response

def send_reminder_email(recipient_name, recipient_email):
    MAILGUN_API_KEY="40e2401e9599c3933b477f692f777583-784975b6-fb5915c8"
    MAILGUN_DOMAIN_NAME="sandbox4bdbbd09b21542d1a41ef3ab735ddbd1.mailgun.org"
        
    html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Get Back to Your Routine</title>
            <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #121212;
                color: #c1ff72;
                font-family: "Arial", sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
                background-image: url("https://live.staticflickr.com/65535/54136715101_22a33bd7ed_b.jpg");
                background-size: cover;
                background-position: center;
                padding: 40px 20px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            }
            .overlay {
                background: rgba(0, 0, 0, 0.6);
                padding: 20px;
                border-radius: 10px;
            }
            .header {
                font-size: 36px;
                margin-bottom: 10px;
                color: #c1ff72;
            }
            .sub-header {
                font-size: 18px;
                margin-bottom: 20px;
                color: #ffffff;
            }
            .cta-button {
                display: inline-block;
                background-color: #c1ff72;
                color: #121212;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 30px;
                font-weight: bold;
                margin-top: 20px;
            }
            .content-section {
                margin-top: 30px;
                color: #ffffff;
                text-align: left;
                font-size: 16px;
            }
            .footer {
                margin-top: 30px;
                padding: 20px;
                background-color: #1d1d1d;
                border-radius: 10px;
                color: #c1ff72;
                text-align: center;
            }
            .social-icons img {
                width: 30px;
                height: 30px;
                margin: 0 10px;
            }
            @media only screen and (max-width: 600px) {
                .header {
                font-size: 28px;
                }
                .sub-header {
                font-size: 16px;
                }
                .container {
                padding: 20px 10px;
                }
                .social-icons img {
                width: 24px;
                height: 24px;
                }
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="overlay">
                <h1 class="header">Back to Business, {{NAME}}!</h1>
                <p class="sub-header">
                Taking a break? That's fine—once. But greatness doesn’t come from waiting. It comes from showing up. You didn't come this far to only come this far.
                </p>
                <a href="YOUR_CALL_TO_ACTION_LINK" class="cta-button">Get Moving Now</a>

                <div class="content-section">
                <p>
                    You know what you're capable of, {{NAME}}. Here's how to get back into it:
                </p>
                <ul>
                    <li>Reconnect with your workout plans and push your limits.</li>
                    <li>Start tracking again—progress doesn't happen without it.</li>
                    <li>Commit to staying on top of your goals. No excuses.</li>
                    <li>Leverage our personal training tips to stay disciplined.</li>
                </ul>
                <p>
                    You’ve set the standard for yourself, and it’s time to meet it again. Let’s not let your hard work go to waste. We know you have it in you.
                </p>
                </div>

                <div class="footer">
                <p>Follow us on:</p>
                <div class="social-icons">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png" alt="Twitter" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" />
                </div>
                <p>&copy; 2024 POWER PATH GUYS. All rights reserved.</p>
                </div>
            </div>
            </div>
        </body>
        </html>
    """.replace("{{NAME}}", recipient_name)
    
    response =  requests.post(
        f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN_NAME}/messages",
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": "Power Path Guys <mailgun@{MAILGUN_DOMAIN_NAME}>",
            "to": [recipient_email],
            "subject": "Get Back to Business!",
            "html": html_content
        })

    # Print the response status code and body
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)
    
    return response

# Example usage:
send_reminder_email("Julian Willis", "julian.maximal@gmail.com")