<?php
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
if ($detect->isMobile() || $detect->isTablet()) {
	header('Location: /home.php');
}
?>

<!DOCTYPE HTML>
<html>

<head>
	<title>Vanilla Hosting</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link rel="stylesheet" href="assets/css/main.css" />
	<noscript>
		<link rel="stylesheet" href="assets/css/noscript.css" />
	</noscript>
</head>

<body class="homepage is-preload">
	<div id="page-wrapper">
		<div id="header">
			<div class="inner">
				<header>
					<h1><a id="logo">Vanilla Hosting</a></h1>
					<hr />
					<p>Cheap Minecraft Server Hosting</p>
				</header>
				<footer>
					<a href="#features" class="button circled scrolly">View Plans</a>
				</footer>
			</div>
		</div>
		<div class="wrapper style1">

			<section id="features" class="container special">
				<header>
					<h2>Plans</h2>
				</header>
				<div class="row">
					<article class="col-4 col-12-mobile special">
						<header>
							<h3><a href="#">Gold</a></h3>
						</header>
						<p>
							The Gold plan comes with 1GB of ram, hosted on an Intel i9 7980XE server shared with other users, a shared IP with a random port, and the Multicraft control panel.
						</p>
					</article>
					<article class="col-4 col-12-mobile special">
						<header>
							<h3><a href="#">Diamond</a></h3>
						</header>
						<p>
							The Diamond plan comes with 4GB of ram, hosted on an Intel i9 7980XE server shared with other users, a dedicated IP with access to all ports, and the Multicraft control panel.
						</p>
					</article>
					<article class="col-4 col-12-mobile special">
						<header>
							<h3><a href="#">Emerald</a></h3>
						</header>
						<p>
							The Emerald plan comes with 8GB of ram, hosted on a dedicated server with an Intel i9 7980XE, full SSH and FTP access, a dedicated IP with access to all ports, and an optional pre-installed Multicraft control panel.
						</p>
					</article>
				</div>
			</section>

		</div>
		<div id="footer">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<section class="contact">
							<header>
								<h3>Would you like to contact us?</h3>
							</header>
							<p>We are powered by Server.Pro, Contact us here</p>
							<ul class="icons">
								<li><a href="https://twitter.com/serverprohost" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
								<li><a href="https://www.facebook.com/server.pro.hosting/" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
							</ul>
						</section>
						<div class="copyright">
							<ul class="menu">
								<li>Copyright © 2013 – 2018 Server.pro</li>
								<li>Developer: <a href="https://shaybox.com">ShayBox</a></li>
							</ul>
						</div>

					</div>

				</div>
			</div>
		</div>

	</div>
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery.dropotron.min.js"></script>
	<script src="assets/js/jquery.scrolly.min.js"></script>
	<script src="assets/js/jquery.scrollex.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script>

</body>

</html>
