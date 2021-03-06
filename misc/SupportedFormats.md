# Introduction #

I will describe which formats of letter is supported by the extension and what problem you might experience with them.


# Generic SVN mailer formar #

This is most common format of letters that sent by SVN mailers. It usually looks like this
```
Added:
   trunk/file2.ext
Modified:
   trunk/file1.ext
   trunk/file3.ext

Modified: trunk/file1.ext
==============================================================================
--- trunk/file1.ext	(original)
+++ trunk/file1.ext	Fri Jun 29 06:34:58 2007
@@ -1,3 +1,3 @@
 line one
-line three
+line two
 the last line

Added: trunk/file2.ext
==============================================================================
--- (empty file)
+++ trunk/file2.ext	Fri Jun 29 06:34:58 2007
@@ -0,0 +1,4 @@
+line one
+line two
+line three
+the last line

Modified: trunk/file3.ext
===================================================================
(Binary files differ)
```

It's easy to parse and you shouldn't have any problems with that. Note however that almost all the other formats looks generally the same but with minor differences that makes them harder to parse. So even if you can't see the difference it still might be there preventing extension from working correctly.
PS. Sometimes when there was only binary files committed the letter isn't going to be colored. It could be fixed but I'm afraid it could cause your system performance to go down. On the other hand if there are only binary files then there aren't any interesting things to look at so that shouldn't affect you much.

# git mailer format #

```
  file1.ext |   2 +-
  1 files changed, 1 insertions(+), 1 deletions(-)

diff --git a/file1.ext b/file2.ext
index 3456367..456357 765423
--- a/file1.ext
+++ b/file1.ext
@@ -1,3 +1,3 @@ line one
-line three
+line two
 the last line
```

Nothing too exciting. I have no idea how new and binary files might look here, so they can  break the parser. If that is the case just mail me broken letter and it's going to be fixed in the next version.


# Generic CVS format #
```
file1.ext
file2.ext
file3.ext

--- NEW FILE:	file1.ext ---
http://localhost/cgi-bin/viewcvs.cgi/file1.ext
line1
line2

line3
line4

Index: file2.ext
http://localhost/cgi-bin/viewcvs.cgi/file2.ext
===================================================================
RCS file: /data/cvs/file2.ext,v
retrieving revision 1
retrieving revision 2
diff -u -d -r1 -r2
--- file2.ext	1 Jan 2007 00:00:01 -0000	1
+++ file2.ext	1 Jan 2007 00:00:02 -0000	2
@@ -1,3 +1,3 @@
 line one
-line three
+line two
 the last line

--- new BINARY FILE:	 file3.ext ---
http://localhost/cgi-bin/viewcvs.cgi/file3.ext
Old:		NONE
New:	1

--- BINARY FILE: file4.ext in / ---
Old:		1
New:	2
http://localhost/cgi-bin/viewcvs.cgi/file4.ext
```

If you can change this format to another one - please do it. Representation of new files here doesn't have any boundaries for file itself, so it would be parsed really slow (after  every line parser should check if the next one is the beginning of another file) and could be extended to data that isn't really inside the file (like url at the top of it in the example). Also if that --- NEW FILE: --- is the last file in the letter and you have some kind of signature at the end of letter, the signature will be shown as the part of this new file. I can't really do anything smart about it.

# Context CVS format #
```
Modified Files:
	file1.ext

Index: file1.ext
===================================================================
RCS file: /home/cvs/file1.ext,v
retrieving revision 1
retrieving revision 2
diff -C2 -d -r1 -r2
*** file1.ext	1 Jan 2007 00:00:01 -0000	1
--- file1.ext	1 Jan 2007 00:00:02 -0000	2
***************
*** 1,3 ****
  line one
! line two
  the last line
--- 1,3 ----
  line one
! line three
  the last line
```

It's fully supported and should work. If it doesn't please send me broken email.


# Unified patch #
```
diff -u -r -N old/file1.ext new/file1.ext
--- old/file1.ext	1970-01-01 03:00:00.000000000 +0300
+++ new/file1.ext	2007-07-01 23:59:29.000000000 +0400
@@ -0,0 +1 @@
+New super shiny file
Binary files old/file2.ext and new/file2.ext differ
diff -u -r -N old/file3.ext new/file3.ext
--- old/file3.ext	2007-07-04 18:40:48.000000000 +0400
+++ new/file3.ext	1970-01-01 03:00:00.000000000 +0300
@@ -1,1 +0,0 @@
-New super shiny file
\ No newline at end of file
```
Fully supported. Sometimes thought it could end up uncolored if there are only binary files in the patch but then again there nothing interesting to look at in that case.

# Context patch #
```
diff -C2 -r -N old/file1.ext new/file1.ext
*** old/file1.ext	1970-01-01 03:00:00.000000000 +0300
--- new/file1.ext	2007-07-01 23:59:29.000000000 +0400
***************
*** 0 ****
--- 1 ----
+ New super shiny file
Binary files old/file2.ext and new/file2.ext differ
diff -C2 -r -N old/file3.ext new/file3.ext
*** old/file3.ext	2007-07-04 18:40:48.000000000 +0400
--- new/file3.ext	1970-01-01 03:00:00.000000000 +0300
***************
*** 1,1 ****
- New super shiny file
\ No newline at end of file
--- 0 ----
```
Doesn't supported yet. Will be in the next release.