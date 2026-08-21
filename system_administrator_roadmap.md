# خريطة الطريق العملية: من Fresh Graduate إلى Junior Linux System Administrator

**الغرض:** الوصول إلى مستوى يمكنه تشغيل وصيانة بيئة Linux صغيرة بأمان، حل الأعطال الأساسية، توثيق ما فعله، والتقديم بثقة إلى وظائف Junior System Administrator وLinux Support وNOC/Infrastructure Support.

> **القاعدة المهمة:** لا تحاول أن تجمع عشر شهادات. سوق الـSystem Administration يهتم بالسؤال: «هل تستطيع أن تشغّل سيرفراً، تؤمّنه، تراقبه، وتعيد الخدمة لو تعطلت؟». كل مرحلة أدناه يجب أن تنتهي بـ**Lab موثق**، لا بمجرد مشاهدة فيديو.

## 1. ما الذي يجب أن يكون معك فعلاً قبل أول وظيفة؟

| المحور | المطلوب عملياً | مستوى الجاهزية للوظيفة الأولى |
|---|---|---|
| Linux | CLI، users/groups، permissions/ACL، packages، `systemd`، logs، SSH، networking، storage/LVM، cron، firewall، SELinux، backup. | **إلزامي** |
| Networking | IPv4/IPv6 basics، subnetting، VLAN، DNS، DHCP، routing basics، NAT، ports، TCP/UDP، troubleshooting. | **إلزامي** |
| Services | Nginx/Apache، SSH، DNS/DHCP basics، NFS/Samba، container basics، service troubleshooting. | **إلزامي** |
| Security | SSH keys، least privilege، `sudo`، `firewalld`، SELinux basics، updates، log review، backups/restore. | **إلزامي** |
| Windows infrastructure | Windows Server basics، AD DS، DNS، GPO، file shares، PowerShell basics. | **مطلوب بقوة في أغلب الشركات** |
| Virtualization | VM creation، snapshots، virtual networks، cloning، storage allocation. | **مطلوب بقوة** |
| Automation | Bash + Git، ثم Ansible basics. | **يميزك عن أغلب الخريجين** |
| Monitoring & documentation | Service checks، CPU/RAM/disk checks، logs، alert basics، runbook واضح. | **ما يحول الـLab إلى دليل خبرة** |
| Cloud | AWS EC2، IAM، VPC/security groups، S3، basic monitoring. | **إضافة قوية وليست شرط البداية** |

منهج RHCSA الرسمي يغطي جوهر Linux الذي يجب أن تتقنه: الأدوات والـshell، السكربتات، تشغيل الخدمات والعمليات، التخزين وLVM، الصلاحيات، إدارة المستخدمين، الجدار الناري وSELinux، والحاويات الأساسية.[1] كما أن Windows Server/Active Directory يظل جزءاً عملياً من عمل الـSystem Administrator؛ مسار Microsoft الرسمي يتضمن domains وdomain controllers وOUs وGPOs وbackup/recovery والـreplication.[2]

## 2. إعداد معمل التدريب — الأسبوع 0

لا تحتاج سيرفراً مدفوعاً في البداية. جهّز Lab محلياً باستخدام **VirtualBox أو VMware Workstation أو Proxmox**. يفضّل جهاز بذاكرة 16GB RAM أو أكثر كي تشغّل 3–4 أجهزة افتراضية بشكل مريح.

| الجهاز الافتراضي | نظام التشغيل | وظيفة المعمل | شبكة مقترحة |
|---|---|---|---|
| `rhel-lab-01` | Rocky Linux 9 أو AlmaLinux 9 | Linux server الرئيسي | `10.10.10.10` |
| `rhel-lab-02` | Rocky Linux 9 أو AlmaLinux 9 | Client / second server / backup target | `10.10.10.11` |
| `win-dc-01` | Windows Server Evaluation | AD DS + DNS + GPO | `10.10.10.20` |
| `win-client-01` | Windows 11 Evaluation | اختبار domain join وGPO | DHCP أو `10.10.10.30` |

أنشئ مستودع GitHub باسم `sysadmin-homelab`. كل Lab يجب أن يحتوي على: `README.md`، رسم شبكة بسيط، خطوات التنفيذ، اختبارات التحقق، وصورة أو مخرجات أوامر بعد إخفاء أي بيانات حساسة.

## 3. الخطة الزمنية: 16 أسبوعاً عملية

### المرحلة الأولى — Linux Core: الأسبوعان 1–3

**الهدف:** أن تستخدم Linux بدون واجهة رسومية وتفهم ماذا تفعل كل خطوة.

| ما تتعلمه | ما تنفذه بيدك | اختبار إنهاء المرحلة |
|---|---|---|
| Bash navigation، `man`، files، `grep`، pipes، redirection، `find`، `tar`، `vim/nano` | أنشئ users وgroups، مجلدات shared، أرشفة logs، وابحث عن أخطاء داخل log file. | نفّذ 20 أمراً شائعاً دون نسخ/لصق من الإنترنت. |
| Users/groups وpermissions وACL و`sudo` | جهّز 3 مستخدمين بأدوار مختلفة، shared directory، ACL، وسياسة sudo محدودة. | مستخدم Support يستطيع restart خدمة محددة فقط ولا يمتلك root كامل. |
| Package management | استخدم `dnf`، repositories، install/update/remove/query. | ثبّت Nginx من repo ثم أثبت نسخته ومصدره. |
| Processes و`systemd` | استخدم `ps` و`top`/`htop` و`kill` و`systemctl` و`journalctl`. | اكتب systemd service بسيط يبدأ بعد reboot واختبر السجل. |

**Lab 1 — Linux Foundation:** أنشئ `rhel-lab-01`، نفذ hardening أولي، أنشئ حساب admin وحساب support، واضبط permissions و`sudo` وupdates. اكتب runbook من صفحة واحدة بعنوان: `New Linux Server Baseline`.

### المرحلة الثانية — Storage, Boot, Network: الأسبوعان 4–5

**الهدف:** إدارة القرص والشبكة وإصلاح المشكلات الأساسية بدلاً من إعادة تثبيت السيرفر.

| ما تتعلمه | ما تنفذه بيدك | اختبار إنهاء المرحلة |
|---|---|---|
| Partitions، file systems، mounts، `/etc/fstab`، LVM، swap | أضف virtual disk، أنشئ PV → VG → LV، format، mount دائم، ثم وسّع LV بدون فقد البيانات. | أعد تشغيل الجهاز وتأكد أن mount يعمل تلقائياً. |
| Boot & recovery | GRUB basics، rescue mode، targets، reboot/shutdown. | أصلح mount خطأ في `fstab` بطريقة آمنة. |
| TCP/IP & DNS | `ip a`، `ip r`، `ss`، `ping`، `traceroute`، `dig`/`nslookup`، `curl`. | ميّز هل عطل الوصول سببه IP أم route أم DNS أم firewall. |
| Firewall | `firewall-cmd`، zones، services، ports. | افتح HTTP لخدمة Nginx، وامنع SSH من شبكة غير مسموحة. |

**Lab 2 — Storage & Network Recovery:** نفّذ عطلين متعمدين: DNS غير صحيح وmount فاشل. وثّق: العرض، التشخيص، الأمر الذي أصلح المشكلة، ثم طريقة منع تكراره.

### المرحلة الثالثة — Services & Security: الأسابيع 6–8

**الهدف:** تشغيل خدمة حقيقية وتأمينها وتأكيد أنها تستمر بعد reboot.

| الخدمة/الموضوع | المطلوب | دليل الإتقان |
|---|---|---|
| SSH | users، SSH keys، منع root login، تعديل `sshd_config`، file transfer بـ`scp`/`rsync`. | دخول key-based فقط لحساب admin، وتجربة عودة آمنة بعد تعديل config. |
| Web service | Nginx، virtual host، logs، firewall، service enable. | صفحة status تعمل من جهاز ثانٍ، مع reading واضح لـaccess/error logs. |
| SELinux | enforcing/permissive، contexts، booleans، `restorecon`، `semanage`. | حل مشكلة Nginx لا يصل للملفات بسبب SELinux **من دون تعطيل SELinux**. |
| Scheduling & time | `cron`، systemd timers، NTP/chrony. | backup job يومي مع سجل نجاح وفشل. |
| Backups | `rsync`، archives، retention بسيط، test restore. | احذف ملفاً ثم استعده فعلياً من backup. |

**Lab 3 — Secure Web Server:** انشر static site بسيط عبر Nginx، اجعل SSH بـkeys فقط، افتح port 80 عبر firewalld، حافظ على SELinux enforcing، وأضف cron backup إلى `rhel-lab-02`. هذا أول مشروع قوي تضعه في CV.

### المرحلة الرابعة — Windows, Active Directory & Virtualization: الأسابيع 9–10

**الهدف:** أن تكون قابلاً للعمل في بيئات hybrid التي تحتوي Windows وLinux، لا Linux فقط.

| ما تتعلمه | ما تنفذه بيدك | اختبار إنهاء المرحلة |
|---|---|---|
| Windows Server | Server roles، storage، RDP basics، event viewer، updates. | جهّز Windows Server بشكل نظيف داخل الـLab. |
| AD DS | Domain، DC، OUs، users/groups، domain join، DNS integration. | أنشئ domain `corp.lab`، ثم انضم Windows client إليه. |
| Group Policy | password policy، desktop restriction أو drive mapping، gpupdate/gpresult. | اربط GPO بـOU واثبت تطبيقها على client. |
| Virtualization | vSwitch/virtual network، snapshots، clones، CPU/RAM/disk planning. | أنشئ snapshot قبل تغيير خطر، ثم أعد الاسترجاع بنجاح. |

مسار Microsoft الرسمي يذكر AD DS، domain controllers، OUs، users/groups، GPO، backup/recovery، replication، وAD CS باعتبارها مهارات إدارة الهوية في Windows Server.[2]

**Lab 4 — Mini Corporate Domain:** ابنِ domain كامل باسم `corp.lab` مع `win-dc-01` و`win-client-01` و`rhel-lab-01`. أنشئ OUs للـIT وHR، users، GPO policy، وshared folder بصلاحيات مناسبة. التقط رسم architecture بسيط وضمّه للمستودع.

### المرحلة الخامسة — Monitoring, Troubleshooting & Documentation: الأسابيع 11–12

**الهدف:** التحول من «شخص يثبت خدمة» إلى «شخص يكتشف العطل ويشرحه ويمنع تكراره».

| المجال | ما يجب تنفيذه |
|---|---|
| Monitoring | اختر **Zabbix أو Prometheus + Grafana**، وراقب CPU، RAM، disk usage، service availability، وHTTP endpoint واحد على الأقل. |
| Logs | استخدم `journalctl` و`/var/log`، اعرف الفرق بين error وwarning، واكتب طريقة جمع أدلة العطل. |
| Troubleshooting | تمرّن على مشاكل: disk full، service down، DNS failure، permission denied، port blocked، high CPU، website 502. |
| Documentation | لكل عطل اكتب Ticket/Incident صغير: impact، symptoms، evidence، root cause، fix، verification، prevention. |

**Lab 5 — Incident Day:** افتعل 5 أعطال ثم حلها خلال 90 دقيقة. بعد كل عطل، اكتب Post-Incident Report قصيراً. هذه الملفات هي أفضل إجابة عندما يسألك مسؤول التوظيف: «هل عندك خبرة Troubleshooting؟».

### المرحلة السادسة — Automation & Cloud Basics: الأسابيع 13–14

**الهدف:** جعل العمل قابلاً للتكرار، وليس مجرد أوامر يدوية.

| ما تتعلمه | ما تنفذه | لماذا مهم |
|---|---|---|
| Bash | variables، conditions، loops، functions، arguments، exit codes، logging. | لأتمتة checks وbackups وuser management البسيط. |
| Git | branches، commits مفهومة، `.gitignore`، README. | لتقديم دليل عمل مرتب وموثوق. |
| Ansible | inventory، playbook، variables، handlers، idempotency basics. | لإدارة أكثر من server ومواكبة اتجاه infrastructure automation. |
| AWS basics | EC2، security groups، IAM least privilege، VPC basics، EBS، S3. | إضافة مفيدة للأدوار السحابية؛ لا تضعها قبل Linux core. |

**Lab 6 — Automated Baseline:** اكتب Ansible playbook يضيف users، يثبت Nginx، يفعّل الخدمة، يضبط firewall، وينشر صفحة status على `rhel-lab-01` و`rhel-lab-02`. شغّله مرتين وأثبت أنه لا يغيّر شيئاً في التشغيل الثاني بلا سبب.

### المرحلة السابعة — مشروع التخرج المهني: الأسبوعان 15–16

ابنِ مشروعاً واحداً تحت عنوان:

> **Small Business Infrastructure Lab — Linux, Windows AD, Monitoring & Automated Operations**

| جزء المشروع | المطلوب |
|---|---|
| Architecture | 2 Linux servers + Windows DC + Windows client، رسم شبكة وعناوين IP. |
| Identity | AD DS، OUs، users/groups، policy واحدة، والتمييز بين admin/support/user. |
| Linux operations | Nginx service، SSH keys، SELinux enforcing، firewalld، LVM، backup/restore. |
| Network | DNS resolution، subnet/route واضح، فحص connectivity، troubleshooting scenario. |
| Monitoring | Dashboard أو alerts أساسية لخدمة وdisk وCPU. |
| Automation | Ansible playbook للـbaseline أو Nginx deployment. |
| Documentation | README، architecture diagram، build guide، operations runbook، incident reports، screenshots. |

**هذا المشروع هو ما يجعلك تقول بصدق في المقابلة:** «لم أعمل في production بعد، لكن بنيت بيئة صغيرة شبيهة بالشركات، شغلت services، أمنت الوصول، راقبتها، عملت backup/restore، وأتمت جزءاً منها.»

## 4. الترتيب الصحيح للشهادات

| الترتيب | الشهادة/المسار | متى؟ | القرار |
|---:|---|---|---|
| 1 | **RHCSA (EX200)** | بعد Labs 1–3 وتمكنك من تنفيذ المهام دون شرح | **أفضل شهادة Linux لمسارك**؛ الامتحان عملي ويغطي المهارات الأساسية لإدارة RHEL.[1] |
| 2 | **CCNA** | حافظ على المعرفة وطبقها في الـLab؛ إن لم تكن قد حصلت عليها رسمياً فاستكملها لاحقاً. | مفيدة جداً لأدوار Network/NOC ولفهم مشاكل البنية التحتية. |
| 3 | **Microsoft AD DS / Windows Server learning path** | بالتوازي مع Lab 4. | لا تحتاج دفعاً فورياً لشهادة؛ اثبت AD Lab أولاً.[2] |
| 4 | **Ansible / RHCE path** | بعد RHCSA وبناء Playbook حقيقي. | لا تبدأ بها قبل Linux core؛ RHCE يبني على RHCSA.[3] |
| 5 | **AWS Cloud Practitioner أو AZ-900** | فقط إذا أنهيت Linux core وAWS/Azure lab. | إضافة مفيدة، لكنها لا تعوض ضعف Linux أو troubleshooting. |

## 5. ما تكتبه في CV وLinkedIn بعد كل مشروع

لا تكتب: `Linux — Excellent` أو `System Administration — Very Good` من دون دليل. اكتب أفعالاً ونتائج قابلة للتحقق.

| بدلاً من | اكتب |
|---|---|
| `Studied Linux` | `Built a Rocky Linux homelab covering user and permission management, systemd services, LVM storage, SELinux, firewalld, Nginx, and tested backup/restore procedures.` |
| `Learned Networking` | `Designed and troubleshot a virtual network with DNS resolution, routing checks, service ports, and documented fault-isolation steps.` |
| `Learning DevOps` | `Automated baseline Linux server configuration using Ansible to manage users, Nginx, services, and firewall rules across two hosts.` |
| `Windows Server knowledge` | `Configured an Active Directory lab with OUs, users/groups, domain-joined clients, DNS, and a Group Policy baseline.` |

ضع رابط GitHub أو البورتفوليو بجوار كل مشروع، واحذف أي كلمة لا تستطيع الدفاع عنها في مقابلة عملية.

## 6. مقابلة Junior System Administrator — قائمة الاستعداد

### يجب أن تستطيع الإجابة أو التنفيذ مباشرة

| السؤال/الموقف | المطلوب منك |
|---|---|
| لا يمكن الدخول إلى server عبر SSH. من أين تبدأ؟ | connectivity → DNS/IP/route → port 22 و`ss` → `firewalld` → `sshd` → logs → permissions/key. |
| الموقع يعرض 502 أو لا يفتح. | تحقق من Nginx status/logs، backend/service، port binding، firewall، SELinux، DNS. |
| Disk is full. | استخدم `df -h` و`du` وlogs وdeleted-open files عند الحاجة؛ نظّف بأمان وامنع التكرار. |
| مستخدم يحتاج صلاحية محددة. | group first، least privilege، ACL أو sudo محدود، ثم تحقق. |
| خدمة لا تبدأ بعد reboot. | `systemctl enable`، status، `journalctl -u`، dependencies، config validation. |
| ما الفرق بين DNS وDHCP؟ | DNS يحول الاسم إلى IP؛ DHCP يوزع إعدادات الشبكة تلقائياً. |
| ما هو LVM ولماذا؟ | طبقة مرنة فوق physical volumes تسمح بتوسعة logical volumes دون إعادة بناء كاملة. |
| لماذا لا تعطل SELinux؟ | لأنه طبقة mandatory access control؛ شخّص context/boolean/port بدلاً من إيقافه. |
| ما فائدة الـbackup إن لم تختبره؟ | لا قيمة تشغيلية له؛ يلزم test restore موثق. |

## 7. معيار الجاهزية للتقديم

**ابدأ التقديم فوراً** عندما تنجز الشروط التالية، حتى لو لم تنهِ كل شيء في الخريطة:

- [ ] لديك Lab Linux موثق يشمل users، SSH keys، systemd، Nginx، firewalld، SELinux، LVM، وbackup/restore.
- [ ] تستطيع حل 5 أعطال Linux بدون فيديو: DNS، disk، permissions، service، network/firewall.
- [ ] لديك GitHub فيه على الأقل 3 README جيدة وصور أو مخرجات تحقق.
- [ ] لديك مشروع Windows AD أو تعرف أساسياته بصورة عملية.
- [ ] تستطيع شرح مشروعك بالإنجليزية في دقيقتين، وبالعربية بتفاصيل troubleshooting.
- [ ] سيرتك تعرض **Projects/Labs** قبل قائمة الكورسات.
- [ ] قدّمت على أدوار: IT Support، NOC/Network Support، Linux Support، Junior Infrastructure، System Admin Intern، وDevOps/Release Intern.

## 8. خطة أسبوعية ثابتة لكي لا تتشتت

| اليوم | العمل | الزمن |
|---|---|---:|
| السبت–الاثنين | تعلم محور واحد + تنفيذ الأوامر على الـLab | 90–120 دقيقة يومياً |
| الثلاثاء | تحويل ما تعلمته إلى مهمة تشغيل واقعية أو عطل متعمد | 120 دقيقة |
| الأربعاء | توثيق README ورفع commits منظمة | 60–90 دقيقة |
| الخميس | مراجعة أسئلة مقابلة والتقديم على 3–5 فرص Fresh/Intern | 60 دقيقة |
| الجمعة | مراجعة أسبوعية: ما الذي يعمل؟ ما الذي فشل؟ ما هو دليل التعلم؟ | 45 دقيقة |

## References

[1]: https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam "Red Hat — RHCSA EX200 exam objectives"
[2]: https://learn.microsoft.com/en-us/training/paths/active-directory-domain-services/ "Microsoft Learn — Active Directory Domain Services learning path"
[3]: https://www.redhat.com/en/services/certification/rhcsa "Red Hat — RHCSA certification overview"
