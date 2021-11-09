// default functions
function toaster(title, message, type) {
    hideLoading();
    swal.close();
    toastr[type](message, title)
}

function login() {
    showLoading();
    const userName = $('input[name=userName]').val();
    const password = $('input[name=password]').val();
    if (!userName || !password) {
        toaster('Warning!', 'Type username and password', 'info');
    } else {
        $.post('functions.php?action=login', {userName: userName, password: password}, function (data) {
            if (data === '2') {
                toaster('Unsuccessful', 'Type username and password', 'error');
            } else if (data === '3') {
                toaster('Unsuccessful', 'Username or password incorrect', 'error');
            } else if (data === '1') {
                hideLoading();
                $('.btn-primary').attr('disabled', true);
                window.location.href = 'admin';
            }
        });
    }
}

function exit() {
    swal({
        title: "Are you sure to sign out?",
        text: "",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
    }, function (isConfirm) {
        if (isConfirm) {
            showLoading();
            $.post('functions.php?action=exit', {}, function (data) {
                console.log('data : ', data);
                toaster("Signed out", '', 'success');
                window.location = 'admin';
            });
        }
    });
}

function notLogged() {
    toaster('Error!', 'You are not logged in', 'error');
    location.reload();
}

function cleaForm(form) {
    $(form)[0].reset();
}

function showLoading() {
    $('#loader').addClass('active');
    $('body').css('overflow-y', 'hidden')
}

function hideLoading() {
    $('#loader').removeClass('active');
    $('body').css('overflow-y', 'auto')
}

function saveSiteSettings() {
    showLoading();
    const title = $('input[name="sitetitle"]').val();
    const keys = $('input[name="metakeys"]').val();
    const description = $('input[name="metadescription"]').val();

    const theme = $('select[name="theme"]').val();
    const tcss = $('select[name="tcss"]').val();

    const aboutMe = $('input[name="aboutMe"]:checked').val();
    const projects = $('input[name="projects"]:checked').val();
    const educations = $('input[name="educations"]:checked').val();
    const references = $('input[name="references"]:checked').val();
    const experiences = $('input[name="experiences"]:checked').val();
    const message = $('input[name="message"]:checked').val();
    const blog = $('input[name="blog"]:checked').val();
    const awards = $('input[name="awards"]:checked').val();
    const skill = $('input[name="skill"]:checked').val();

    if (title && keys && description) {
        $('#save').attr('disabled', true);
        $.post('functions.php?process=saveSiteSettings', {
            theme: theme,
            tcss: tcss,
            awards: awards ? awards : 0,
            blog: blog ? blog : 0,
            references: references ? references : 0,
            skill: skill ? skill : 0,
            aboutMe: aboutMe ? aboutMe : 0,
            projects: projects ? projects : 0,
            educations: educations ? educations : 0,
            message: message ? message : 0,
            experiences: experiences ? experiences : 0,
            title: title,
            keys: keys,
            description: description
        }, function (data) {
            if (data === '1')
                toaster('Success!', 'The information has been updated', 'success');
            else if (data === '2') {
                toaster('Error!', 'Unknown Error.', 'info');
            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            }
        }).done(function () {

            $('#save').attr('disabled', false);
        });
    } else {
        $('#save').attr('disabled', false);
        toaster('Error!', 'Fields must .', 'info');

    }
}

function saveGeneralSetting() {
    showLoading();
    const headerText = $('input[name="headerText"]').val();
    const nameSurname = $('input[name="nameSurname"]').val();
    const ShortText = $('input[name="ShortText"]').val();
    const telephone = $('input[name="telephone"]').val();
    const address = $('input[name="address"]').val();
    const email = $('input[name="email"]').val();
    const googleMap = $('input[name="googleMap"]').val();
    const birthDay = $('input[name="birthDay"]').val();
    const aboutMe = $('textarea[name="aboutMe"]').val();
    const facebook = $('input[name="facebook"]').val();
    const instagram = $('input[name="instagram"]').val();
    const twitter = $('input[name="twitter"]').val();
    const linkedin = $('input[name="linkedin"]').val();
    const youtube = $('input[name="youtube"]').val();
    const tumblr = $('input[name="tumblr"]').val();
    const skype = $('input[name="skype"]').val();
    const connectionType = $('select[name="connectionType"]').val();
    if (headerText && nameSurname && aboutMe && telephone && email && birthDay && address && ShortText) {
        if (skype && !connectionType) {
            toaster('Error!', 'You did not choose Skype contact option', 'error');
        } else {
            $('#save').attr('disabled', true);
            $.post('functions.php?process=saveGeneralSetting', {
                connectionType: connectionType,
                googleMap: googleMap,
                headerText: headerText,
                nameSurname: nameSurname,
                ShortText: ShortText,
                telephone: telephone,
                address: address,
                email: email,
                birthDay: birthDay,
                aboutMe: aboutMe,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                linkedin: linkedin,
                youtube: youtube,
                tumblr: tumblr,
                skype: skype
            }, function (data) {
                if (data === 1) {

                    toaster('Success!', 'The information has been updated.', 'success');
                } else if (data === 2) {
                    toaster('Error!', 'Unknown Error.', 'info');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                }
            }).done(function () {
                $('#save').attr('disabled', false);

            });
        }
    } else {

        toaster('Error!', 'Important fields are empty.', 'error');
    }
}

function createBlogXML() {
    showLoading();
    $.post('functions.php?process=createBlogXml', {
        setXML: true
    }, function (data) {
        if (data === 1) {
            toaster('Success!', 'The XML created.', 'success');
            const button = $('#xmlURLModalButton');
            button.click();
            $('#xmlURLInput').trigger('focus')
        } else if (data === 2) {
            toaster('Error!', 'Unknown Error.', 'info');
        } else if (data === 3) {
            toaster('Error!', 'XML file not exist.', 'info');
        } else if (data === 'bos') {
            notLogged();
        } else if (data === 'demo') {
            toaster('Error!', 'Demo account cannot process', 'error');
        }
    }).done(function () {
        $('#save').attr('disabled', false);

    });
}

function doActiveComment(commentID) {
    swal({
            title: "Are you sure you want to activate this comment?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00a65a",
            confirmButtonText: "Activate",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=doActiveComment', {commentID: commentID}, function (data) {
                    if (data === 1) {
                        toaster("Success!", "Comment activated.", "success");
                        $('#activeButton' + commentID).remove();
                        $('#commentTableButton' + commentID).prepend('<a class="btn btn-info btn-xs" id="deactivateButton' + commentID + '" onclick="doDeactivateComment(' + commentID + ')">Deactivate comment</a>');
                    } else if (data === '2') {
                        toaster('Error', 'An error occurred while activating comment', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    }
                });
            }
        });
}

function doDeactivateComment(commentID) {
    swal({
            title: "Are you sure you want to deactivate this comment?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00c0ef",
            confirmButtonText: "Deactivate",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=doDeactivateComment', {commentID: commentID}, function (data) {
                    if (data === 1) {
                        toaster("Success!", "Comment deactivated.", "success");
                        $('#deactivateButton' + commentID).remove();
                        $('#commentTableButton' + commentID).prepend('<a class="btn btn-success btn-xs" id="activeButton' + commentID + '" onclick="doActiveComment(' + commentID + ')">Activate comment</a>');
                    } else if (data === '2') {
                        toaster('Error', 'An error occurred while deactivating comment', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    }
                });
            }
        });
}

function blockIP(IP) {
    swal({
        title: "Are you sure you want to block this IP?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Block",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            showLoading();
            $.post('functions.php?process=blockIP', {IP: IP}, function (data) {
                if (data === 1) {
                    toaster('Error', 'Unknown error', 'error')
                } else if (data === '2') {
                    toaster('Error', 'This IP had blocked before', 'error');
                } else if (data === '3') {
                    toaster('Error', 'It is impossible to block own IP', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {
                    toaster("Success!", "IP blocked.", "success");
                }
            });
        }
    });
}

function unBlockIP(ID) {
    swal({
        title: "Are you sure you want to unblock this IP?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            showLoading();
            $.post('functions.php?process=unBlockIP', {ID: ID}, function (data) {
                if (data === 1) {
                    toaster('Error', 'Unknown error', 'error')
                } else if (data === '2') {
                    toaster('Error', 'It is not founded the IP you want to unblocked', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {
                    $('#blockedIP' + ID).fadeOut();
                    toaster("Success!", "IP unblocked.", "success");
                }
            });
        }
    });
}

// add process functions
function addAward() {
    showLoading();
    const awardDescription = $('input[name=awardDescription]').val();
    const awardYear = $('select[name=awardYear]').val();
    if (awardDescription && awardYear) {
        $('#save').attr('disabled', true);
        $.post('functions.php?process=addAward', {
            awardDescription: awardDescription,
            awardYear: awardYear
        }, function (data) {
            if (data === 2) {
                toaster('Error!', 'The information is empty.', 'info');

            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            } else {
                $('#awardTable').append(data);
                cleaForm('#awardForm');

                toaster('Success!', 'Award added', 'success');
            }
        }).done(function () {
            $('#save').attr('disabled', false);

        });
    } else {
        toaster('Error!', 'Important fields are empty.', 'error');

    }
}

function addCategory() {
    showLoading();
    const categoryName = $('input[name=categoryName]').val();
    if (categoryName) {
        $('#save').attr('disabled', true);
        $.post('functions.php?process=addCategory', {categoryName: categoryName}, function (data) {
            if (data === '2') {

                toaster('Error!', 'Unknown Error.', 'info');
            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            } else {

                cleaForm('#categoryForm');
                $('#categoryTable').append('<tr id="categoryTableItem' + data + '"><td>' + categoryName + '</td><td><a onclick="deleteCategory(\'' + data + '\');" class="btn btn-block btn-danger"><i class="fa fa-times"></i> Delete</a></td></tr>');
                $('#selectCategory').append('<option id="selectCategoryID' + data + '" value="' + data + '">' + categoryName + '</option>');
                toaster('Success!', 'Category added.', 'success');
            }
        }).done(function () {
            $('#save').attr('disabled', false);

        });
    } else {

        toaster('Error!', 'Important fields are empty.', 'error');
    }
}

function addEducation() {
    const schoolName = $('input[name=schoolName]').val();
    const department = $('input[name=department]').val();
    const graduatedYear = $('select[name=graduatedYear]').val();
    if (schoolName) {
        $('#save').attr('disabled', true);
        $.post('functions.php?process=addEducation', {
            schoolName: schoolName,
            department: department,
            graduatedYear: graduatedYear
        }, function (data) {
            if (data === 2) {
                toaster('Error!', 'Unknown Error.', 'info');

            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            } else {
                $('#educationTable').append(data);

                cleaForm('#educationForm');
                toaster('Success!', 'Education added.', 'success');
            }
        }).done(function () {

            $('#save').attr('disabled', false);
        });
    } else
        toaster('Error!', 'Important fields are empty.', 'error');

}

function addExperience() {
    showLoading();
    const companyName = $('input[name=companyName]').val();
    const companyDescription = $('input[name=companyDescription]').val();
    const startMonth = $('select[name=startMonth]').val();
    const startYear = $('select[name=startYear]').val();
    const endMonth = $('select[name=endMonth]').val();
    const endYear = $('select[name=endYear]').val();
    if (companyName && companyDescription && startMonth && startYear) {
        if (endYear && !endMonth || !endYear && endMonth) {

            toaster('Error!', 'End year and month must be entered at the same time.', 'error');
        } else if (endYear && endYear < startYear) {

            toaster('Error!', 'End year cannot be less than start year.', 'error');
        } else {
            $('#save').attr('disabled', true);
            $.post('functions.php?process=addExperience', {
                companyName: companyName,
                companyDescription: companyDescription,
                startMonth: startMonth,
                startYear: startYear,
                endMonth: endMonth,
                endYear: endYear
            }, function (data) {
                if (data === 2) {

                    toaster('Error!', 'Unknown Error.', 'info');
                } else if (data === 3) {

                    toaster('Error!', 'End year and month must be entered at the same time.', 'error');
                } else if (data === 4) {

                    toaster('Error!', 'End year cannot be less than start year.', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {

                    cleaForm('#experienceForm');
                    $('#experienceTable').append(data);
                    toaster('Success!', 'Experience added', 'success');
                }
            }).done(function () {
                $('#save').attr('disabled', false);

            });
        }
    } else {
        toaster('Error!', 'Important fields are empty.', 'error');

    }
}

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    $("#changeProfilePicture").on('submit', (function (e) {
        showLoading();
        e.stopPropagation();
        e.preventDefault();
        $('#profilePictureButton').attr('disabled', true);
        $.ajax({
            url: "functions.php?process=changeProfileImage",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data === 1) {

                    $("#profilePictureIcon").removeAttr("src").attr("src", "/assets/images/profile.jpg?tf=" + new Date().getTime());
                    $("#profilePictureSidebar").removeAttr("src").attr("src", "/assets/images/profile.jpg?tf=" + new Date().getTime());
                    $("#profilePicture").removeAttr("src").attr("src", "/assets/images/profile.jpg?tf=" + new Date().getTime());
                    $("#generalProfilePicture").removeAttr("src").attr("src", "/assets/images/profile.jpg?tf=" + new Date().getTime());
                    toaster('Success!', 'Profile picture has been updated', 'success');
                } else if (data === 2) {

                    toaster('Error!', 'You have not selected an image.', 'error');
                } else if (data === 3) {

                    toaster('Error!', 'The extension is invalid. It should just be jpg.', 'error');
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else if (data === 'bos') {

                    notLogged();
                }
                $('#profilePictureButton').attr('disabled', false);
            }, error: function () {

                toaster('Error!', 'An error occurred', 'error');
                $('#profilePictureButton').attr('disabled', true);
            }
        });
    }));
    $("#changeCoverPicture").on('submit', (function (e) {
        showLoading();
        e.preventDefault();
        e.stopPropagation();
        $('#coverButton').attr('disabled', true);
        $.ajax({
            url: "functions.php?process=changeCoverImage",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data === 1) {

                    $("#coverPicture").removeAttr("src").attr("src", "/assets/images/cover.jpg?tf=" + new Date().getTime());
                    toaster('Success!', 'Profile picture has been updated', 'success');
                } else if (data === 2) {

                    toaster('Error!', 'You have not selected an image.', 'error');
                } else if (data === 3) {

                    toaster('Error!', 'The extension is invalid. It should just be jpg.', 'error');
                } else if (data === 'bos') {

                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                }
                $('#coverButton').attr('disabled', false);
            },
            error: function () {

                toaster('Error!', 'An error occurred', 'error');
                $('#coverButton').attr('disabled', false);
            }
        });
    }));
    $("#projectForm").on('submit', (function (e) {
        showLoading();
        e.preventDefault();
        $('#projectButton').attr('disabled', true);
        const formData = new FormData(this);
        $.ajax({
            url: "functions.php?process=addProject",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data === 1) {

                    toaster('Error!', 'Important fields are empty.', 'error');
                } else if (data === 2) {

                    toaster('Error!', 'You have not selected an image.', 'error');
                } else if (data === 3) {

                    toaster('Error!', 'The extension is invalid. It should just be jpg.', 'error');
                } else if (data === 4) {

                    toaster('Error!', 'An error occurred', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {

                    $('#projectTable').append(data);
                    $('#projectButton').attr('disabled', false);

                    cleaForm('#projectForm');
                    toaster('Success!', 'Project added', 'success');
                }
                $('#projectButton').attr('disabled', false);
            },
            error: function () {

                toaster('Error!', 'An error occurred', 'error');
                $('#projectButton').attr('disabled', false);
            }
        });
    }));
    $("#referenceForm").on('submit', (function (e) {
        e.preventDefault();
        showLoading();
        $('#referenceButton').attr('disabled', true);
        const formData = new FormData(this);
        $.ajax({
            url: "functions.php?process=addReference",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data === 2) {
                    toaster('Error!', 'Image not selected.', 'error');
                } else if (data === 3) {
                    toaster('Error!', 'The extension is invalid. It should just be jpg.', 'error');
                } else if (data === 4) {
                    toaster('Error!', 'The information is empty.', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {
                    cleaForm('#referenceForm');
                    $('#referenceTable').prepend(data);
                    toaster('Success!', 'Reference added', 'success');
                }

                $('#referenceButton').attr('disabled', false);
            },
            error: function () {
                toaster('Error!', 'An error occurred', 'error');
                $('#referenceButton').attr('disabled', false);
            }
        });
    }));
    $("#blogForm").on('submit', function (e) {
        e.preventDefault();
        showLoading();
        const formData = new FormData(this);
        $('#blogButton').attr('disabled', true);
        $.ajax({
            url: "functions.php?process=addBlog",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data === 2) {

                    toaster('Error!', 'You have not selected an image.', 'error');
                } else if (data === 3) {

                    toaster('Error!', 'The extension is invalid. It should just be jpg.', 'error');
                } else if (data === 4) {

                    toaster('Error!', 'The information is empty.', 'error');
                } else if (data === 'error') {

                    toaster('Error!', 'An error occurred', 'error');
                } else if (data === 'bos') {
                    notLogged();
                } else if (data === 'demo') {
                    toaster('Error!', 'Demo account cannot process', 'error');
                } else {
                    $('#blogTable').prepend(data);
                    cleaForm('#blogForm');

                    $('#blogButton').attr('disabled', false);
                    toaster('Success!', 'Post added.', 'success');
                }
                $('#blogButton').attr('disabled', false);
            }
        });
    });
});

function editBlogFunction() {
    showLoading();
    const id = $('input[name=id]').val();
    const title = $('input[name=title]').val();
    const shortText = $('textarea[name=shortText]').val();
    const longText = $('textarea[name=longText]').val();
    const status = $('select[name=status]').val();
    const metaKeys = $('input[name=metaKeys]').val();
    if (id && title && shortText) {
        $('#editBlog').attr('disabled', true);
        $.post('functions.php?process=editBlog', {
            id: id,
            title: title,
            shortText: shortText,
            longText: longText,
            metaKeys: metaKeys,
            status: status
        }, function (data) {
            if (data === '2') {
                toaster('Error!', 'Unknown Error.', 'info');
            } else if (data === '3') {
                toaster('Error!', 'Post not edited. Try again.', 'info');
            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            } else {
                toaster('Success!', 'Post edited.', 'success');
                window.location.href = 'admin/blog';
            }
        }).done(function () {
            $('#editBlog').attr('disabled', false);
        });
    } else {
        toaster('Error!', 'Important fields are empty.', 'error');
    }
}

function addSkill() {
    showLoading();
    const skillDescription = $('input[name=skillDescription]').val();
    const percent = $('select[name=percent]').val();
    if (skillDescription && percent) {
        $.post('functions.php?process=addSkill', {
            skillDescription: skillDescription,
            percent: percent
        }, function (data) {
            if (data === 2) {

                toaster('Error!', 'Unknown Error.', 'info');
            } else if (data === 'bos') {
                notLogged();
            } else if (data === 'demo') {
                toaster('Error!', 'Demo account cannot process', 'error');
            } else {

                cleaForm('#skillForm');
                $('#skillTable').append(data);
                toaster('Success!', 'Skill added.', 'success');
            }
        });
    } else {
        toaster('Error!', 'Important fields are empty.', 'error');

    }
}

function addComment(postID) {
    const comment = $('textarea[name=comment]').val();
    const name = $('input[name=commentName]').val();
    const email = $('input[name=commentEmail]').val();
    const website = $('input[name=commentWebsite]').val();
    if (comment && name && email) {
        $.post('functions.php?commentProcess=addComment', {
            postID: postID,
            comment: comment,
            name: name,
            email: email,
            website: website
        }, function (data) {
            if (data === 1) {
                toaster('Error!', 'Important fields are empty.', 'error');
            } else if (data === 2) {
                toaster('Error!', 'Email not valid', 'error');
            } else if (data === 3) {
                toaster('Error!', 'Unknown Error', 'error');
            } else {
                cleaForm('#commentForm');
                toaster('Success!', 'Your comment has been added. Will be published after the administrator approves', 'success');
            }
        });
    } else {
        toaster('Error!', 'Important fields are empty.', 'error');
    }
}

function moveToTop(blogID) {
    showLoading();
    $.post('functions.php?process=moveToTop', {blogID: blogID}, function (data) {
        if (data === 'bos') {
            notLogged();
        } else if (data === 'demo') {
            toaster('Error!', 'Demo account cannot process', 'error');
        } else {
            const blogHtml = $('#blogTableItem' + blogID).html();
            $('#blogTableItem' + blogID).remove();
            $('#blogTable').prepend('<tr id="blogTableItem' + blogID + '">' + blogHtml + '</tr>');
            $('#blogTableItem' + blogID).fadeOut().fadeIn();
            toaster('Success!', 'The blog post was moved to the very beginning', 'success');

        }
    });
}

// delete process functions
function deleteAward(awardID) {
    swal({
            title: "Are you sure you want to delete the award?",
            type: "warning",
            icon: '',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteAward', {awardID: awardID}, function (data) {
                    if (data === 1) {
                        toaster("Success!", "Award deleted.", "success");
                        $('#awardTableItem' + awardID).fadeOut();

                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Award', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteBlog(blogID) {
    swal({
            title: "Are you sure you want to delete the blog post?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteBlog', {blogID: blogID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Post deleted", "success");
                        $('#blogTableItem' + blogID).fadeOut();
                        $('#blogTableItem' + blogID).remove();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Post', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteCategory(categoryID) {
    swal({
            title: "Projects of the category and category will be deleted. Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteCategory', {categoryID: categoryID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Projects belonging to category and category have been deleted", "success");
                        $('#categoryTableItem' + categoryID).fadeOut();
                        $('#selectCategoryID' + categoryID).remove();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Category', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteExperience(experienceID) {
    swal({
            title: "Are you sure you want to delete the experience?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteExperience', {experienceID: experienceID}, function (data) {
                    if (data === 1) {
                        toaster("Success!", "Experience deleted.", "success");

                        $('#experienceTableItem' + experienceID).fadeOut();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Experience', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteEducation(educationID) {
    swal({
            title: "Are you sure you want to delete the education?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteEducation', {educationID: educationID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Education deleted.", "success");
                        $('#educationTableItem' + educationID).fadeOut();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Education', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteProject(projectID) {
    swal({
            title: "Are you sure you want to delete the project?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteProject', {projectID: projectID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Project deleted", "success");
                        $('#projectTableItem' + projectID).fadeOut();
                        $('#projectTableItem' + projectID).remove();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Project', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteReference(referenceID) {
    swal({
            title: "Are you sure you want to delete the reference?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteReference', {referenceID: referenceID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Reference deleted", "success");
                        $('#referenceTableItem' + referenceID).fadeOut();
                        $('#referenceTableItem' + referenceID).remove();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Reference', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteSkill(skillID) {
    swal({
            title: "Are you sure you want to delete the skill information?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteSkill', {skillID: skillID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Skill information deleted", "success");
                        $('#skillTable' + skillID).fadeOut();
                    } else if (data === '2') {

                        toaster('Error', 'An error occurred while deleting Skill', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    } else if (data === 'demo') {
                        toaster('Error!', 'Demo account cannot process', 'error');
                    }
                });
            }
        });
}

function deleteComment(commentID) {
    swal({
            title: "Are you sure you want to delete this comment?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteComment', {commentID: commentID}, function (data) {
                    if (data === 1) {
                        toaster("Success!", "Comment deleted.", "success");
                        $('#commentTable' + commentID).fadeOut();
                    } else if (data === '2') {
                        toaster('Error', 'An error occurred while deleting comment', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    }
                });
            }
        });
}

function deleteMessage(messageID) {
    swal({
            title: "Are you sure you want to delete the message?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                showLoading();
                $.post('functions.php?process=deleteMessage', {messageID: messageID}, function (data) {
                    if (data === 1) {

                        toaster("Success!", "Message deleted.", "success");
                        $('#messageTable' + messageID).fadeOut();
                    } else if (data === '2') {
                        toaster('Error', 'An error occurred while deleting Message', 'error')
                    } else if (data === 'bos') {
                        notLogged();
                    }
                });
            }
        });
}
