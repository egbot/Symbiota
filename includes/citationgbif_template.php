<?php
if(!isset($collData) && isset($this->collArr)) $collData = $this->collArr;
?>
<?php echo ($DEFAULT_TITLE) ? $DEFAULT_TITLE : "Name of people or institutional reponsible for maintaining the portal"; ?> (<?php echo date('Y'); ?>). <?php echo $collData['gbiftitle']; ?>. Occurrence dataset https://doi.org/<?php echo $collData['doi']; ?> accessed via the <?php echo ($DEFAULT_TITLE) ? $DEFAULT_TITLE : "Custom title for the portal"; ?> Portal, <?php echo $SERVER_HOST . $CLIENT_ROOT; ?> on <?php echo date('Y-m-d'); ?>.
