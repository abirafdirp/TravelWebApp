from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from kompres2015.article.models import Article

from kompres2015.image.models import ArticleImage


class ArticleAdminForm(forms.ModelForm):
    article = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Article
        fields = '__all__'


class ArticleImageInline(admin.TabularInline):
    model = ArticleImage


class ArticleAdmin(admin.ModelAdmin):
    inlines = [
        ArticleImageInline,
    ]
    form = ArticleAdminForm


admin.site.register(Article, ArticleAdmin)
