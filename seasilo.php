<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

	<!-- Basic Page Needs
  ================================================== -->
	<meta charset="utf-8">
	<title>George Gally - Sea Silo</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- CSS
  ================================================== -->
	<link rel="stylesheet" href="css/skeleton.css">
	<link rel="stylesheet" href="css/style.css">


	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/favicon.ico">
	<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

	<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
  <script src="js/jquery.fitvids.js"></script>

</head>

<body style="background: #fafafa">

	<div class="back-header">

		<a href="index.html#seasilo">< Back</a> &nbsp;

	</div>

	<div class="container">

		<div class="sixteen columns add-bottom">

			<h1 class="remove-bottom">Sea Silo</h1>
			Concept, coding, design, animation <br>
			<br><br>
			<b>Large form artwork visualising shipping data.</b> <br><br>

			Amsterdam’s identity has always been linked to the sea. And the sea is changing.
90% everything we own and use, at some point, travels to us by container ship, through a vast network of ocean routes and ports that most of us know almost nothing about.
			 <br>

		</div>

    	<div id = "videoholder" class="sixteen columns add-bottom">

				<iframe id="seasilo1" src="https://player.vimeo.com/video/219845313" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

				<br><br>

				<iframe id="seasilo2" src="https://player.vimeo.com/video/219845915" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

				<br><br>
				<blockquote>
					"These ships and boxes belong to a business that feeds, clothes, warms, and supplies us. They have fueled if not created globalization. They are the reason behind your cheap T-shirt and reasonably priced television. But who looks behind a television now and sees the ship that brought it? Who cares about the men who steered your breakfast cereal through winter storms? How ironic that the more ships have grown in size and consequence, the less space they take up in our imagination." <br>
					Rose George
				</blockquote>
				<iframe src="https://player.vimeo.com/video/219853112" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

				<br><br>

				<iframe src="https://player.vimeo.com/video/219853832" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

				<br><br>

				</div>

				<div class="sixteen columns add-bottom">

					<p>The outcome of an augumented architecture workshop with <a href="http://www.refikanadol.com/">Refik Anadol</a> in Amerstam for the Fiber Festival. <br>
					The sea has always played a massive part in human civilization. Today, it's importance is greater than it has ever been, yet it is also less acknowledged than it has ever been.
					</p>
					<p>To show the scale and impact shipping has, minimal large scale live data visualisations are projected onto the inside of a grain silo in Zeeburgereiland, itself, reclaimed land, essentially sitting in the sea.</p> <br><br>


					<img src="images/silos_render.jpg" alt="">
		</div>





		</div>


	</div><!-- container -->


<!-- End Document
================================================== -->



<script>
  $(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $("#videoholder").fitVids();
  });
</script>



		<?php include("footer.php"); ?>
		<?php include("tracker.php"); ?>

</body>
</html>
